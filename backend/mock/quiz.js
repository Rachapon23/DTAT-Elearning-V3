const Quiz = require("../models/quiz")

let quiz11
let quiz12
let quiz13
let quiz14
let quiz21
let quiz22
let quiz23
let quiz31
let quiz32
let quiz33
let quiz41
let quiz42
let quiz43

exports.loadQuiz = async () => {
    quiz11 = await Quiz.findOneAndUpdate(
        { question: "What is docker?" },
        {
            question: "What is docker?",
            choices: [
                "Virtual machine",
                "Operating system",
                "Container technology",
                "Database system"
            ],
            image: null,
            answer: 2,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    quiz12 = await Quiz.findOneAndUpdate(
        { question: "10 + 20 = ?" },
        {
            question: "10 + 20 = ?",
            choices: [
                "10",
                "20",
                "30",
                "40"
            ],
            image: null,
            answer: 2,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    quiz13 = await Quiz.findOneAndUpdate(
        { question: "20 + 20 = ?" },
        {
            question: "20 + 20 = ?",
            choices: [
                "10",
                "20",
                "30",
                "40"
            ],
            image: null,
            answer: 3,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    quiz14 = await Quiz.findOneAndUpdate(
        { question: "What is this?" },
        {
            question: "What is this?",
            choices: [
                "What",
                "is",
                "this",
                "?"
            ],
            image: null,
            answer: 3,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    quiz21 = await Quiz.findOneAndUpdate(
        { question: "What is this?" },
        {
            question: "What is this?",
            choices: [
                "What",
                "is",
                "this",
                "?"
            ],
            image: null,
            answer: 3,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    quiz22 = await Quiz.findOneAndUpdate(
        { question: "What is this?" },
        {
            question: "What is this?",
            choices: [
                "What",
                "is",
                "this",
                "?"
            ],
            image: null,
            answer: 3,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    quiz23 = await Quiz.findOneAndUpdate(
        { question: "What is this?" },
        {
            question: "What is this?",
            choices: [
                "What",
                "is",
                "this",
                "?"
            ],
            image: null,
            answer: 3,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    quiz31 = await Quiz.findOneAndUpdate(
        { question: "What is this?" },
        {
            question: "What is this?",
            choices: [
                "What",
                "is",
                "this",
                "?"
            ],
            image: null,
            answer: 3,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    quiz32 = await Quiz.findOneAndUpdate(
        { question: "What is this?" },
        {
            question: "What is this?",
            choices: [
                "What",
                "is",
                "this",
                "?"
            ],
            image: null,
            answer: 3,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    quiz33 = await Quiz.findOneAndUpdate(
        { question: "What is this?" },
        {
            question: "What is this?",
            choices: [
                "What",
                "is",
                "this",
                "?"
            ],
            image: null,
            answer: 3,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    quiz41 = await Quiz.findOneAndUpdate(
        { question: "What is this?" },
        {
            question: "What is this?",
            choices: [
                "What",
                "is",
                "this",
                "?"
            ],
            image: null,
            answer: 3,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    quiz42 = await Quiz.findOneAndUpdate(
        { question: "What is this?" },
        {
            question: "What is this?",
            choices: [
                "What",
                "is",
                "this",
                "?"
            ],
            image: null,
            answer: 3,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    quiz43 = await Quiz.findOneAndUpdate(
        { question: "What is this?" },
        {
            question: "What is this?",
            choices: [
                "What",
                "is",
                "this",
                "?"
            ],
            image: null,
            answer: 3,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    )
}

exports.getQuiz = async () => {
    return {
        quiz11,
        quiz12,
        quiz13,
        quiz14,
        quiz21,
        quiz22,
        quiz23,
        quiz31,
        quiz32,
        quiz33,
        quiz41,
        quiz42,
        quiz43,
    }
}