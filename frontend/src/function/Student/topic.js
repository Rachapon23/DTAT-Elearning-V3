import axios from 'axios'

// GET: /list-topic
export const listTopicCourse = async (authtoken, course_id) =>
    await axios.get(process.env.REACT_APP_API + `/list-topic/course/${course_id}`, {
        headers: {
            authtoken,
        }
    });