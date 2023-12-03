const User = require("../models/user");
const TimeUsage = require("../models/timeUsage")
const { getDiffTimePeriod } = require("./util")

// PUT: /update-timeusage/:id
exports.updateTimeusageById = async (req, res) => {
    try {
        const id = req?.params?.id
        const timeusage = req?.body?.timeusage
        if (!id) return res.status(400).json({ error: "Request not in correct form" });
        if (!timeusage) return res.status(400).json({ error: "Request not in correct form" });
        if (!timeusage.now) return res.status(400).json({ error: "Request not in correct form" });
        const user = await User.findOne({ _id: id })
        if (!user) return res.status(404).json({ error: "User not found" });

        const now = new Date().toLocaleDateString().split("/")
        const day = now[1]
        const month = now[0]
        const year = now[2]
        const findDate = new Date().setHours(24, 0, 0, 0)

        const userTimeUsage = await TimeUsage.findOne({ user: id, date: findDate })

        if (!userTimeUsage) {
            const logged_in_at = new Date()
            const diff = timeusage.now - logged_in_at

            // update last time useage
            const preTimeUsage = await TimeUsage.findOne({ _id: user.timeusage })
            console.log(preTimeUsage)
            const arrayLength = preTimeUsage.timeusage.length
            const length = arrayLength - 1 < 0 ? 0 : arrayLength - 1
            let hasUpdate = false

            if (preTimeUsage.timeusage[length].diff === null) {
                preTimeUsage.timeusage[length].diff = diff
                hasUpdate = true
            }

            if (preTimeUsage.timeusage[length].used_time === null) {
                preTimeUsage.timeusage[length].diff = getDiffTimePeriod(diff)
                hasUpdate = true
            }

            if (hasUpdate) {
                preTimeUsage.markModified('timeusage')
                preTimeUsage.save()
            }
            else {
                // create new time useage
                await TimeUsage.create({
                    user: id,
                    date: findDate,
                    timeusage: [{
                        logged_in_at: logged_in_at,
                        diff: diff,
                        used_time: getDiffTimePeriod(diff),
                    }]
                })
            }
            return res.json({ data: "Saved time usage" });
        }

        const arrayLength = userTimeUsage.timeusage.length
        const length = arrayLength - 1 < 0 ? 0 : arrayLength - 1

        const logged_in_at = userTimeUsage?.timeusage[length].logged_in_at
        const diff = timeusage.now - logged_in_at

        const data = {
            logged_in_at,
            diff,
            used_time: getDiffTimePeriod(diff)
        }

        userTimeUsage.timeusage[length] = data
        userTimeUsage.markModified('timeusage')
        userTimeUsage.save()
        return res.json({ data: "Saved time usage", log: data });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server Error!!! on save time usage" });
    }
}

// GET: /list-timeusage/user/:id
exports.listTimeusageByUser = async (req, res) => {
    try {
        const id = req?.params?.id;
        const date = req?.query?.date;
        if (!id) return res.status(400).json({ error: "Request not in correct form" });
        const search = date ? { user: id, date: date } : { user: id };
        const timeUsages = await TimeUsage.find(search)
        // console.log(timeUsages)
        return res.json({ data: timeUsages });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Unexpected Error on list time usage by user" });
    }
}

