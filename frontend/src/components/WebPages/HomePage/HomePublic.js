import React, { useContext, useState } from "react";
import "./content.css";
import CardCourse from "../../common/CourseCard/CardCourse";
import { Col, Row, Image, Modal } from "antd";
import { HomeContext } from './HomeContext';
import Auth from "../Navbar/Auth";
import { useNavigate } from "react-router-dom";
import { NavbarContext } from "../Navbar/NavbarContext";
import { NavbarProvider } from "../Navbar/NavbarContext";

const GROUP_NUMBER = 3
const DEFAULT_DATA = {
  detail: "Waiting for new course...",
  image: null,
  name: "No course available",
}

const arrayTemplate = new Array(6).fill(false)

const HomePublic = () => {
  const {
    isModalOpenAuth,
    setIsModalOpenAuth,
    showModalAuth,
    handleOkAuth,
    handleCancelAuth,
  } = useContext(NavbarContext);

  const { coursePublic } = useContext(HomeContext)
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

      setIsModalOpenAuth(true)
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
    setIsModalOpenAuth(false);
  };

  const renderContent = (index) => {
    if (index % GROUP_NUMBER !== 0) return null

    return (
      <div className="row-content">
        {
          coursePublic.length > 0 ?
            (
              coursePublic.slice(index, index + GROUP_NUMBER).map((data) => (
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
                <Row>
                  <div className="col-content">
                    <CardCourse data={DEFAULT_DATA} />
                  </div>
                </Row>
              ))
            )
        }
      </div>
    )

  }

  return (
    <div className="content-course">
      <div className="title-content">
        <p className="title-1">Public Course</p>
        <p className="title-2">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
      </div>
      <div className="">
        <div className="row-content">
          {
            coursePublic.length > 0 ?
              (
                coursePublic.map((_, index) => (
                  renderContent(index)
                ))
              )
              :
              (
                arrayTemplate.map((_, index) => (
                  renderContent(index)
                ))
              )
          }
        </div>
      </div>
      {/* <div className="btn-navigate">
        <button className="btn-show-more">Show More</button>
      </div> */}
      <Modal
        className="modal-ant"
        style={{
          top: 100,
          left: 0,
          right: 0,
        }}
        open={isModalOpenAuth}
        // width={1500}
        // title="login"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        mask={false}
      >
        <Row justify={"center"} style={{paddingTop: "30px"}}>
          <Col flex={"auto"}>
            <Auth />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default HomePublic;
