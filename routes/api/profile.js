const express = require('express')
const axios = require('axios')
const config = require('config')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url')
const checkObjectId = require('../../middleware/checkObjectId')

const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Post')

// @route GET api/profile/me
// @desc  Get current user's profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    )
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route POST api/profile/
// @desc  Create or Update user profile
// @access Private
router.post(
  '/',

  auth,

  check('county', 'County is required').notEmpty(),
  check('subCounty', 'Sub County is required').notEmpty(),
  check('ward', 'Ward is required').notEmpty(),
  check('village', 'Village is required').notEmpty(),
  check('email', 'Email is required').isEmail(),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { county, subCounty, ward, village, email } = req.body
    //Build profile object
    const profileFields = {
      user: req.user.id,

      county:
        county && county !== '' ? normalize(county, { forceHttps: true }) : '',
      subCounty:
        subCounty && subCounty !== ''
          ? normalize(subCounty, { forceHttps: true })
          : '',
      ward: ward && ward !== '' ? normalize(ward, { forceHttps: true }) : '',
      village:
        village && village !== ''
          ? normalize(village, { forceHttps: true })
          : '',
      email:
        email && email !== '' ? normalize(county, { forceHttps: true }) : '',
    }

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      )
      return res.json(profile)
    } catch (err) {
      console.error(err.message)
      return res.status(500).send('Server Error')
    }
  }
)

// @route GET api/profile
// @desc  Get all profile
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    res.send(profiles)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route GET api/profile/user/:user_id
// @desc  Get profile by user ID
// @access Public
router.get(
  '/user/:user_id',
  checkObjectId('user_id'),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id,
      }).populate('user', ['name', 'avatar'])

      if (!profile) return res.status(400).json({ msg: 'Profile not found' })

      return res.json(profile)
    } catch (err) {
      console.error(err.message)
      return res.status(500).json({ msg: 'Server error' })
    }
  }
)

// @route DELETE api/profile
// @desc  DElete profile, user and posts
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    // Remove profile
    // Remove user
    await Promise.all([
      Post.deleteMany({ user: req.user.id }),
      Profile.findOneAndRemove({ user: req.user.id }),
      User.findOneAndRemove({ _id: req.user.id }),
    ])

    res.json({ msg: 'User deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route PUT api/profile/Vaccine
// @desc  Add profile vaccines
// @access Private
router.put(
  '/vaccine',

  auth,

  check('doses', 'Number of Doses is required').notEmpty(),
  check('vaccineName', 'The Name of Vaccine is required').notEmpty(),
  check('date', 'The date of vaccination is required').notEmpty(),
  check('rate', 'The date of vaccination is required').notEmpty(),
  check('manufacturer', 'The Manufacturer name is required')
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.vaccine.unshift(req.body)
      await profile.save()
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route DELETE api/profile/Vaccine/:vac_id
// @desc  Delete a vaccine from Profile
// @access Private
router.delete('/vaccine/:vac_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id })

    foundProfile.vaccine = foundProfile.vaccine.filter(
      (vac) => vac._id.toString() !== req.params.vac_id
    )

    await foundProfile.save()
    return res.status(200).json(foundProfile)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'Server error' })
  }
})

// @route PUT api/profile/AnimalRegistration
// @desc  Add profile animal registration
// @access Private
router.put(
  '/animalRegistration',

  auth,

  check('regNumber', 'Registration Number is required').notEmpty(),
  check('breed', 'Animal breed is required').notEmpty(),
  check('sex', 'Animal gender is required').notEmpty(),
  check('idNo', 'Animals Identification Number is required').notEmpty(),
  check('dob', 'The Date of Birth is required')
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.animalRegistration.unshift(req.body)
      await profile.save()
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route DELETE api/profile/AnimalRegistration/:reg_id
// @desc  Delete a Registered animal from Profile
// @access Private
router.delete('/animalRegistration/:reg_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id })

    foundProfile.animalRegistration = foundProfile.animalRegistration.filter(
      (reg) => reg._id.toString() !== req.params.reg_id
    )

    await foundProfile.save()
    return res.status(200).json(foundProfile)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
