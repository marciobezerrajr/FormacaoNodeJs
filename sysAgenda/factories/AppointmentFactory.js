class AppointmentFactory {
    Build(simpleAppointment) {

        const day = simpleAppointment.date.getDate() + 1
        const month = Number.parseInt(simpleAppointment.date.getMonth())
        const year = Number.parseInt(simpleAppointment.date.getFullYear())

        const hour = simpleAppointment.time.split(':')[0]
        const min = simpleAppointment.time.split(':')[1]

        var startDate = new Date(year, month, day, hour, min, 0, 0)
        
        var appo = {
            id: simpleAppointment.id,
            title: simpleAppointment.name + " - " + simpleAppointment.description,
            start: startDate,
            end: startDate,
            notified: simpleAppointment.notified,
            email: simpleAppointment.email
        } 
        return appo
       
    }
}

module.exports = new AppointmentFactory()