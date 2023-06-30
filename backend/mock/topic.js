const Topic = require("../models/topic")
const { getCourse } = require("./course")

let topic11
let topic21
let topic31
let topic41
let topic51
let topic52

exports.loadTopic = async () => {
    const {
        course1,
        course2,
        course3,
        course4,
        course5,
    } = await getCourse()

    topic11 = await Topic.findOneAndUpdate(
        { course: course1, title: "Topic11" },
        {
            title: "Topic11",
            detail: "Topic11 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, ipsum repudiandae dolor excepturi rem sit atque dolorum voluptatum molestiae iusto culpa vitae dignissimos pariatur illum harum officia nobis animi asperiores!",
            sub_content: [
                "1. Lorem ipsum dolor sit amet consectetur adipisicing elit",
                "2. Amet, voluptatibus ipsam nisi dicta, ratione saepe molestias aliquam laudantium quidem",
                "3. Dignissimos ullam cumque sunt odit facere impedit veritatis sequi suscipit nihil"
            ],
            link: {
                name: "Google",
                link: "https://www.google.com"
            },
            file: [
            ],
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    topic21 = await Topic.findOneAndUpdate(
        { course: course2, title: "Topic21" },
        {
            title: "Topic21",
            detail: "Topic21 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, ipsum repudiandae dolor excepturi rem sit atque dolorum voluptatum molestiae iusto culpa vitae dignissimos pariatur illum harum officia nobis animi asperiores!",
            sub_content: [
                "1. Lorem ipsum dolor sit amet consectetur adipisicing elit",
                "2. Amet, voluptatibus ipsam nisi dicta, ratione saepe molestias aliquam laudantium quidem",
                "3. Dignissimos ullam cumque sunt odit facere impedit veritatis sequi suscipit nihil"
            ],
            link: {
                name: "Google",
                link: "https://www.google.com"
            },
            file: [
            ],
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    topic31 = await Topic.findOneAndUpdate(
        { course: course3, title: "Topic31" },
        {
            title: "Topic31",
            detail: "Topic31 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, ipsum repudiandae dolor excepturi rem sit atque dolorum voluptatum molestiae iusto culpa vitae dignissimos pariatur illum harum officia nobis animi asperiores!",
            sub_content: [
                "1. Lorem ipsum dolor sit amet consectetur adipisicing elit",
                "2. Amet, voluptatibus ipsam nisi dicta, ratione saepe molestias aliquam laudantium quidem",
                "3. Dignissimos ullam cumque sunt odit facere impedit veritatis sequi suscipit nihil"
            ],
            link: {
                name: "Google",
                link: "https://www.google.com"
            },
            file: [
            ],
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    topic41 = await Topic.findOneAndUpdate(
        { course: course4, title: "Topic41" },
        {
            title: "Topic41",
            detail: "Topic41 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, ipsum repudiandae dolor excepturi rem sit atque dolorum voluptatum molestiae iusto culpa vitae dignissimos pariatur illum harum officia nobis animi asperiores!",
            sub_content: [
                "1. Lorem ipsum dolor sit amet consectetur adipisicing elit",
                "2. Amet, voluptatibus ipsam nisi dicta, ratione saepe molestias aliquam laudantium quidem",
                "3. Dignissimos ullam cumque sunt odit facere impedit veritatis sequi suscipit nihil"
            ],
            link: {
                name: "Google",
                link: "https://www.google.com"
            },
            file: [
            ],
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    topic51 = await Topic.findOneAndUpdate(
        { course: course5, title: "Topic51" },
        {
            title: "Topic51",
            detail: "Topic51 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, ipsum repudiandae dolor excepturi rem sit atque dolorum voluptatum molestiae iusto culpa vitae dignissimos pariatur illum harum officia nobis animi asperiores!",
            sub_content: [
                "1. Lorem ipsum dolor sit amet consectetur adipisicing elit",
                "2. Amet, voluptatibus ipsam nisi dicta, ratione saepe molestias aliquam laudantium quidem",
                "3. Dignissimos ullam cumque sunt odit facere impedit veritatis sequi suscipit nihil"
            ],
            link: {
                name: "Google",
                link: "https://www.google.com"
            },
            file: [
            ],
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    topic52 = await Topic.findOneAndUpdate(
        { course: course5, title: "Topic52" },
        {
            title: "Topic52",
            detail: "Topic52 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, ipsum repudiandae dolor excepturi rem sit atque dolorum voluptatum molestiae iusto culpa vitae dignissimos pariatur illum harum officia nobis animi asperiores!",
            sub_content: [
                "1. Lorem ipsum dolor sit amet consectetur adipisicing elit",
                "2. Amet, voluptatibus ipsam nisi dicta, ratione saepe molestias aliquam laudantium quidem",
                "3. Dignissimos ullam cumque sunt odit facere impedit veritatis sequi suscipit nihil"
            ],
            link: {
                name: "Python",
                link: "https://www.youtube.com/watch?v=x7X9w_GIm1s"
            },
            file: [
            ],
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

}

exports.getTopic = async () => {
    return {
        topic11,
        topic21,
        topic31,
        topic41,
        topic51,
        topic52,
    }
}