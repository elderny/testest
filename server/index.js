const app = require('express')()
const bodyParser = require('body-parser').json()
require('mongoose').connect('mongodb+srv://elderny:Howehesehede90!@cluster0.aozk6ra.mongodb.net/test')
app.use(bodyParser, require('cors')())
const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true })
const CompanySchema = mongoose.Schema({
    billedUser: {
        type: String,
        required: true
    },
    sales: {
        type: Number,
        required: true
    },
    payment_pending: {
        type: Number,
        required: true
    },
    payment_done: {
        type: Number,
        required: true
    },
    renewal: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })
const EmailsSchema = mongoose.Schema({
    template: {
        type: String,
        required: true
    },
    sendTo: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })
const NotificationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    notifyTo: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    }
})
const SmsSchema = mongoose.Schema({
    Gateway: {
        type: String,
        required: true
    },
    Template: {
        type: String,
        required: true
    },
    sendTo: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    sendCopy: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
const User = mongoose.model('user', UserSchema)
const Company = mongoose.model('company', CompanySchema)
const Emails = mongoose.model('emails', EmailsSchema)
const Sms = mongoose.model('sms', SmsSchema)
const Notification = mongoose.model('notification', NotificationSchema)
app.get('/addUser', async (req, res) => {
    const addUser = await new User(req.query).save()
    res.send(addUser)
})
app.get('/addCompany', async (req, res) => {
    const addCompany = await new Company(req.query).save()
    res.send(addCompany)
})
app.post('/addEmails', async (req, res) => {
    const addEmails = await new Emails(req.body).save()
    res.send(addEmails)
})
app.post('/addSms', async (req, res) => {
    const addSms = await new Sms(req.body).save()
    res.send(addSms)
})
app.post('/addNotification', async (req, res) => {
    const addNotification = await new Notification(req.body).save()
    res.send(addNotification)
})
app.get('/dashboard', async (req, res) => {
    const data = await Company.find()
    let sales = 0, payment_done = 0, payment_pending = 0, newClient = 0, renewals = 0
    let date1 = new Date(new Date(Date.now()).getTime()).getDate()
    data.forEach(e => { sales += e.sales; payment_done += e.payment_done; if (e.renewal) renewals++; payment_pending += e.payment_pending; if (new Date(new Date(e.createdAt).getTime()).getDate() == date1) newClient++ })
    let info = { sales, payment_done, payment_pending, newClient }
    res.json(info)
})
app.get('/ptdashboard', async (req, res) => {
    const data = await Company.find()
    const total = await User.find().count()
    let sales = 0, payment_done = 0, payment_pending = 0, newClient = 0, renewals = 0
    data.forEach(e => { sales += e.sales; payment_done += e.payment_done; if (e.renewal) renewals++; payment_pending += e.payment_pending; newClient++ })
    let info = { sales, payment_done, payment_pending, total }
    res.json(info)
})
app.listen(5000)