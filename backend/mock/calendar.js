const Calendar = require("../models/calendar")

let calendar6
let calendar7

exports.loadCalendar = async () => {
    calendar6 = await Calendar.findOneAndUpdate(
        { title: "Advance Data struture and Algorithm" },
        {
            title: "Advance Data struture and Algorithm",
            start: new Date("2023-06-21T00:00:00.000+00:00"),
            end: new Date("2023-06-23T00:00:00.000+00:00"),
            color: "#0288D1",
            allDay: true,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    calendar7 = await Calendar.findOneAndUpdate(
        { title: "Advance Software Engineer" },
        {
            title: "Advance Software Engineer",
            start: new Date("2023-06-21T00:00:00.000+00:00"),
            end: new Date("2023-06-23T00:00:00.000+00:00"),
            color: "#ff0000",
            allDay: true,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

}

exports.getCalendar = async () => {
    return {
        calendar6,
        calendar7,
    }
}