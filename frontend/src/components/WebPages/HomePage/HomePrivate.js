import React, { useContext, useState } from 'react'
import "./content.css";
import CardCourse from "../../common/CourseCard/CardCourse";
import { Col, Modal, Row } from "antd";
import { HomeContext } from './HomeContext';
import { useNavigate } from 'react-router-dom';
import Auth from "../Navbar/Auth";

const GROUP_NUMBER = 3
const DEFAULT_DATA = {
  detail: "Waiting for new course...",
  image: null,
  name: "No course available",
}

const arrayTemplate = new Array(6).fill(false)

const HomePrivate = () => {

  const { coursePrivate } = useContext(HomeContext)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleNavigate = (navStr, dataStage) => {
    navigate(navStr, { state: dataStage })
  }

  const checkUserLogin = () => {
    if (
      !sessionStorage.getItem("token") ||
      !sessionStorage.getItem("firstname") ||
      !sessionStorage.getItem("user_id") ||
      !sessionStorage.getItem("role")
    ) {
      setOpen(true)
      return false
    }
    return true

  }

  const handleClickCourse = (e, data) => {
    console.log(data?._id)
    e.target.id = data?._id

    if (!e?.target?.id) return
    if (!checkUserLogin()) return

    handleNavigate(`/student/page/register-course/${e?.target?.id}`)
  }

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const homePrivatePc = (index) => {
    if (index % GROUP_NUMBER !== 0) return null

    return (
      <div className="row-content">
        {
          coursePrivate.length > 0 ?
            (
              coursePrivate.slice(index, index + GROUP_NUMBER).map((data) => (
                <Col span={6} >
                  <div className="col-content">
                    <CardCourse
                      onClick={(e) => handleClickCourse(e, data)}
                      data={{
                        name: data?.name,
                        detail: data?.detail,
                        image: data?.image?.name
                      }}
                    />
                  </div>
                </Col>
              ))
            )
            :
            (
              arrayTemplate.slice(index, index + GROUP_NUMBER).map(() => (
                <div className="col-content">
                  <CardCourse data={DEFAULT_DATA} />
                </div>
              ))
            )
        }
      </div>
    )

  }

  const homePrivateMobile = (index) => {
    if (index % GROUP_NUMBER !== 0) return null

    return (
      <div className="row-content">
        {
          coursePrivate.length > 0 ?
            (
              coursePrivate.slice(index, index + GROUP_NUMBER).map((data) => (
                <Col span={6} >
                  <div className="col-content">
                    <CardCourse
                      onClick={(e) => handleClickCourse(e, data)}
                      data={{
                        name: data?.name,
                        detail: data?.detail,
                        image: data?.image?.name
                      }}
                    />
                  </div>
                </Col>
              ))
            )
            :
            (
              <div style={{ overflowX: 'scroll', width: '80%', height: '100%' }}>
                <div style={{ display: 'flex', alignContent: 'baseline' }}>
                  {
                    arrayTemplate.map(() => (
                      <div className="col-content" style={{ paddingRight: 20 }}>
                        <CardCourse data={DEFAULT_DATA} />
                      </div>
                    ))
                  }
                </div>
              </div>
            )
        }
      </div>
    )
  }

  const renderHomePrivate = (index) => {
    if (false) {
      return homePrivatePc(index)
    }
    if (true) {
      return homePrivateMobile(index)
    }
  }

  return (
    <div className="content-course">
      <div className="title-content">
        <p className="title-1">Private Course</p>
        <p className="title-2" style={{ paddingInline: 10 }}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
      </div>
      <div className="">
        <div className="row-content">
          {
            coursePrivate.length > 0 ?
              (
                coursePrivate.map((_, index) => (
                  renderHomePrivate(index)
                ))
              )
              :
              (
                [false].map((_, index) => (
                  renderHomePrivate(index)
                ))
              )
          }
        </div>
      </div>

      <Modal
        className="modal-ant"
        style={{
          top: 100,
          left: 0,
          right: 0,
        }}
        open={open}
        // width={1500}
        // title="login"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        mask={false}
      >
        <Auth />
      </Modal>
    </div>
  )
}

export default HomePrivate