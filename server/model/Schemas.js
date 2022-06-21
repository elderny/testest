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