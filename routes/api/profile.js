const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

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
  [
    auth,
    [
      check('county', 'County is required').not().isEmpty(),
      check('subCounty', 'Sub County is required').not().isEmpty(),
      check('ward', 'Ward is required').not().isEmpty(),
      check('village', 'Village is required').not().isEmpty(),
      check('email', 'Email is required').isEmail(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { county, subCounty, ward, village, email } = req.body
    //Build profile object
    const profileFields = {}
    profileFields.user = req.user.id
    if (county) profileFields.county = county
    if (subCounty) profileFields.subCounty = subCounty
    if (ward) profileFields.ward = ward
    if (village) profileFields.village = village
    if (email) profileFields.email = email

    try {
      let profile = await Profile.findOne({ uuser: req.user.id })
      if (profile) {
        //Update
        profile = await Profile.findOneUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        return res.json(profile)
      }
      //Create
      profile = new Profile(profileFields)
      await profile.save()
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
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
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar'])
    if (!profile) return res.status(400).json({ msg: 'Profile not found' })
    res.send(profile)
  } catch (err) {
    console.error(err.message)
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: ' Profile not found' })
    }
    res.status(500).send('Server Error')
  }
})

// @route DELETE api/profile
// @desc  DElete profile, user and posts
// @access Private
router.delete('/', auth, async (req, res) => {
  try {
    //@todo -remove users posts

    //Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id })
    //Remove Profile
    await User.findOneAndRemove({ _id: req.user.id })

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
  [
    auth,
    [
      check('doses', 'Number of Doses rrequired').not().isEmpty(),
      check('vaccineName', 'The Name of Vaccine is required').not().isEmpty(),
      check('date', 'The date of vaccination is required').not().isEmpty(),
      check('manufacturer', 'THe Manufacturer name is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const { doses, vaccineName, date, manufacturer } = req.body
    const newVaccine = { doses, vaccineName, date, manufacturer }
    try {
      const profile = await Profile.findOne({ user: req.user.id })
      profile.vaccine.unshift(newVaccine)
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
    const profile = await Profile.findOne({ user: req.user.id })

    //Get remove index
    const removeIndex = profile.vaccine
      .map((item) => item.id)
      .indexOf(req.params.vac_id)
    profile.vaccine.splice(removeIndex, 1)
    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
