
const sendEmail = ({ from, to, subject, body }) => {
    try {
        console.log({ from, to, subject, body })
        return
    } catch (error) {
        console.log({ error })
        return error
    }
}

module.exports = {
    sendEmail
}