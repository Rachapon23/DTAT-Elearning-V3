import React, { useState } from "react";

const CourseCreateB = () => {
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    detail: "",
    room: "",
    type: "true",
    video: "",
    image: "",
    teacher: "",
  });
  const [valuetopic, SetValueTopic] = useState([]);

  const [nextState, setNextState] = useState([]);
  const handldInfo = (e) => {
    setCourseInfo({ ...courseInfo, [e.target.name]: e.target.value });
  };

  const handleAddTopic = () => {
    console.log("ADD");
    SetValueTopic([
      ...valuetopic,
      {
        title: "",
        description: "",
        text: [],
        link: [],
        file: [],
      },
    ]);
  };

  const [percent, setPercent] = useState(0);
  const [indexStep, setIndexStep] = useState(1);

  return (
    <>
      <div className="card">
        <div className="card-body">
          <p className="card-title">Create Course</p>
          <hr />
          <div className="d-flex justify-content-between">
            {courseInfo.type === "true" ? (
              <>
                <div className="rounded border border-5">
                  <p className="m-1">Step 1</p>
                </div>
                <div className="rounded border border-5">
                  <p className="m-1">Step 2</p>
                </div>
              </>
            ) : (
              <>
                <div className="rounded border border-5">
                  <p className="m-1">Step 1</p>
                </div>
                <div className="rounded border border-5">
                  <p className="m-1">Step 2</p>
                </div>
                <div className="rounded border border-5">
                  <p className="m-1">Step 3</p>
                </div>
                <div className="rounded border border-5">
                  <p className="m-1">Step 4</p>
                </div>
              </>
            )}
          </div>
          <div className="progress mt-2">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${percent}%` }}
              aria-valuenow={`${percent}`}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <hr />
          {indexStep === 1 ? (
            <form className="p-3">
              <div className="mb-3">
                <label htmlFor="namecourse" className="form-label">
                  Name Course
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="namecourse"
                  placeholder="input name course"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="detailcourse" className="form-label">
                  Detail Course
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="detailcourse"
                  placeholder="input detail course"
                />
              </div>
              <div className="form-check form-check-inline mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id="inlineRadio1"
                  onChange={handldInfo}
                  value={true}
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Public Course
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  onChange={handldInfo}
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id="inlineRadio2"
                  value={false}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Privaete Course
                </label>
              </div>
              <div className="mb-3">
                <label htmlFor="imagecover" className="form-label">
                  Image Cover
                </label>
                <input type="file" className="form-control" id="imagecover" />
              </div>
            </form>
          ) : (
            <>
              {indexStep === 2 ? (
                <>
                  <div className="">Time && Room</div>
                </>
              ) : (
                <>
                  {indexStep === 3 ? (
                    <>
                      <div className="">manage Plant</div>
                    </>
                  ) : (
                    <>
                      {indexStep === 4 ? (
                        <>
                          <div className="d-flex justify-content-end">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={handleAddTopic}
                            >
                              add
                            </button>
                          </div>
                          {valuetopic.map((item, index) => (
                            <div className="shadow p-3 my-3" key={index}>
                              <div className="mb-3">
                                <div className="d-flex justify-content-between mb-3">
                                <label
                                  htmlFor="titletopic"
                                  className="form-label"
                                >
                                  title
                                </label>
                                <button className="btn">x</button>
                                </div>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="titletopic"
                                  placeholder="input title topic"
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="detailtopic"
                                  className="form-label"
                                >
                                  Detail topic
                                </label>
                                <textarea
                                  type="text"
                                  className="form-control"
                                  id="detailtopic"
                                  placeholder="input detail topic"
                                />
                              </div>
                              {/* <hr /> */}
                            </div>
                          ))}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-between mt-4">
        <div>
          <button
            className="btn btn-success"
            onClick={() => console.log(valuetopic)}
          >
            Preview
          </button>
        </div>
        <div>
          {indexStep === 1 ? (
            <></>
          ) : (
            <button
              className="btn btn-secondary me-2"
              onClick={() => {
                if (courseInfo.type === "true") {
                  setIndexStep(indexStep - 3);
                  setPercent(percent - 99);
                } else {
                  setIndexStep(indexStep - 1);
                  setPercent(percent - 33);
                }
              }}
            >
              Previous
            </button>
          )}
          {indexStep === 4 ? (
            <button className="btn btn-primary">Create</button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                if (courseInfo.type === "true") {
                  setIndexStep(indexStep + 3);
                  setPercent(percent + 99);
                } else {
                  setIndexStep(indexStep + 1);
                  setPercent(percent + 33);
                }
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseCreateB;
