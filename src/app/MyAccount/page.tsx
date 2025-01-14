"use client";
import React, { useEffect, useState, useTransition } from "react";
import PayPal from "@/assets/pngwing 6.png";
import Visa from "@/assets/pngwing 7.png";
import Google from "@/assets/Group 1820549999.png";
import Card from "@/assets/card22.png";
import Chair from "@/assets/pngwing 2.png";
import Location from "@/assets/layer1.png";
import Home from "@/assets/Vectorhome.png";
import Appartment from "@/assets/Group444.png";
import Office from "@/assets/Layer_1.png";
import { Avatar, Checkbox, Radio } from "@mui/material";
import CustomModal from "@/components/CustomModel";
import { MdDelete, MdOutlineDeleteOutline } from "react-icons/md";
import { LiaUserSlashSolid } from "react-icons/lia";
import { FiEdit } from "react-icons/fi";
import { IoLockClosed } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import close from "@/assets/close.png";
import Shoes from "@/assets/Rectangle 2032.png";
import AAA from "@/assets/Health Report.png";
import BBB from "@/assets/Box.png";
import CCC from "@/assets/Shipping.png";
import DDD from "@/assets/sort by time.png";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaCircleCheck } from "react-icons/fa6";
import Dots from "@/assets/Group 1820549907.png";
import { Rating } from "@mui/material";
import { PiCameraThin } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import {
  createAddressApi,
  createReferralApi,
  deleteAddressApi,
  editAddressApi,
  editPasswordApi,
  editProfileApi,
  getAddressApi,
  getBuyerOrdersApi,
  getOrderByStatusApi,
  getProfileApi,
} from "@/apis";
import { toast } from "react-toastify";
import { logout } from "@/lib";
import { useRouter } from "next/navigation";
import Image from "next/image";
import MyorderCard from "@/components/MyorderCard";
import { BiLoader } from "react-icons/bi";

export default function MyAccount() {
  const [showSendModel, setShowSendModel] = useState(false);
  const [showModelDelete, setShowModelDelete] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const [activeSection, setActiveSection] = useState<string>("Personal Info");
  const [showConfirm, setShowconfirm] = useState(false);
  const [showleave, setShowLeave] = useState(false);
  const [isPending, setPending] = useState(false);
  const [activeSectionorder, setActiveSectiorder] = useState<string>("new");
  const [isCancelOrderVisible, setIsCancelOrderVisible] = useState(false);
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [allAddress, setAllAddress] = useState([]);
  const [addressId, setAddressId] = useState("");

  const [activeOrder, setActiveOrder] = useState([]);
  const [completedOrder, setCompletedOrder] = useState([]);
  const [canceledOrder, setCanceledOrder] = useState([]);
  const [productId, setProductId] = useState("");
  const [userOrders, setUserOrders] = useState([]);
  const [referralLink, setReferralLink] = useState("");
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  useEffect(() => {
    (async () => {
      const { data } = await getProfileApi();

      setCurrentUser(data?.user);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await getAddressApi();

      setAllAddress(res?.data?.addresses || []);
    })();
  }, []);

  useEffect(() => {
    const getOrderByStatus = async () => {
      if (activeSectionorder === "new" && !activeOrder.length) {
        const { data } = await getOrderByStatusApi(activeSectionorder);

        setActiveOrder(data?.orders || []);
      } else if (activeSectionorder === "completed" && !completedOrder.length) {
        const { data } = await getOrderByStatusApi(activeSectionorder);

        setCompletedOrder(data?.orders || []);
      } else if (activeSectionorder === "cancelled" && !canceledOrder.length) {
        const { data } = await getOrderByStatusApi(activeSectionorder);

        setCanceledOrder(data?.orders || []);
      } else {
        return;
      }
    };

    getOrderByStatus();
  }, [activeSectionorder]);

  useEffect(() => {
    (async () => {
      const { data } = await getBuyerOrdersApi();
      setUserOrders(data.orders);
    })();
  }, []);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };
  const handleCloseModel = () => {
    setShowSendModel(false);
  };
  const handleCloseModelDelete = () => {
    setShowModelDelete(false);
  };
  const handleOpenModelDelete = () => {
    setShowModelDelete(true);
  };
  const handelLogout = () => {
    handleSectionChange("Logout");
    setShowSendModel(true);
  };

  const handleSectionChangeorder = (section: string) => {
    setActiveSectiorder(section);
  };

  const handleOpeneModelLeave = () => {
    setShowLeave(true);
  };
  const handelCloseComplet = () => {
    setShowLeave(false);
  };
  const handleOpeneModelconfirm = () => {
    setShowSendModel(false);
    setShowconfirm(true);

    // Close the confirmation modal after 5 seconds
    setTimeout(() => {
      setShowconfirm(false);
    }, 5000);
  };
  const handleOpeneModel = () => {
    setShowSendModel(true);
  };

  const handleButtonClick = () => {
    setIsDivVisible((prev) => !prev);
  };

  const toggleCancelOrderVisibility = () => {
    setIsCancelOrderVisible(!isCancelOonSelectAddressrderVisible);
  };

  async function onEditProfile(formdata) {
    try {
      setPending(true);
      await editProfileApi(formdata);
      toast.success("Profile has been updated");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setTimeout(() => {
        setPending(false);
      }, 500);
    }
  }
  async function onEditPassword(formdata) {
    const cPassword = formdata.get("cPassword");
    const newPassword = formdata.get("new_password");
    if (cPassword !== newPassword) {
      return toast.error("Password did not match");
    }
    try {
      setPending(true);
      await editPasswordApi(formdata);
      toast.success("Password has been updated");
    } catch (error) {
      console.log(error);

      if (error?.response?.status === 400) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setTimeout(() => {
        setPending(false);
      }, 500);
    }
  }
  async function onCreateAddress(formdata) {
    try {
      setPending(true);

      const res = await createAddressApi(formdata);

      setAllAddress([...allAddress, res?.data?.address]);
      toast.success("Address has been created");
    } catch (error) {
      if (error?.response?.status === 400) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setTimeout(() => {
        setPending(false);
      }, 500);
    }
  }
  async function onLogout() {
    try {
      await logout();
      localStorage.clear();
      router.push("/signIn");
    } catch (error) {
      console.log(error);
    }
  }

  async function onEditAddress(formdata) {
    try {
      setPending(true);
      const res = await editAddressApi(id);
      toast.success("Address has been deleted");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setTimeout(() => {
        setPending(false);
      }, 500);
    }
  }
  async function onDeleteAddress(id) {
    if (!addressId) {
      return toast.error("Please select the address");
    }
    try {
      setPending(true);
      await deleteAddressApi(id);
      const filterAddress = allAddress.filter((item) => item.id !== id);
      setAllAddress(filterAddress);
      toast.success("Address has been deleted");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setTimeout(() => {
        setPending(false);
      }, 500);
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setProfileImg(objectUrl);

      // Clean up the object URL when the component unmounts or the file changes
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const generateRefLink = () => {
    startTransition(async () => {
      if (currentUser) {
        const formdata = new FormData();
        formdata.append("sender_user_id", currentUser.id);
        const { data } = await createReferralApi(formdata);
        setReferralLink(data?.referral.unique_link);
      }
    });
  };

  return (
    <div className="lg:my-[20px] my-[20px] sm:my-[20px] md:my-[30px] lg:mx-[150px] mx-[20px] sm:mx-[20px] md:mx-[30px]">
      <div className="flex flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap items-start gap-6 h-auto">
        <div
          style={{ boxShadow: "0px 4px 29px 0px #0000000A" }}
          className="rounded-3xl p-[30px] lg:w-[23%] w-[100%] "
        >
          <div
            onClick={() => handleSectionChange("Personal Info")}
            className={`cursor-pointer pl-5 text-[18px] font-normal cursor-pointer ${
              activeSection === "Personal Info"
                ? "border-l-[4px] border-[#F70000] pl-2"
                : "text-[#8B8B8B] "
            }`}
          >
            Personal Information
          </div>
          <div
            onClick={() => handleSectionChange("Orders")}
            className={`cursor-pointer pl-5  mt-[40px] text-[18px] font-normal cursor-pointer ${
              activeSection === "Orders"
                ? "border-l-[4px] border-[#F70000] pl-2"
                : "text-[#8B8B8B]"
            }`}
          >
            My Orders
          </div>
          <div
            onClick={() => handleSectionChange("Manage Address")}
            className={`cursor-pointer pl-5  mt-[40px] text-[18px] font-normal cursor-pointer ${
              activeSection === "Manage Address"
                ? "border-l-[4px] border-[#F70000] pl-2"
                : "text-[#8B8B8B] "
            }`}
          >
            Manage Address
          </div>
          <div
            onClick={() => handleSectionChange("Payment Method")}
            className={`cursor-pointer pl-5  mt-[40px] text-[18px] font-normal cursor-pointer ${
              activeSection === "Payment Method"
                ? "border-l-[4px] border-[#F70000] pl-2"
                : "text-[#8B8B8B] "
            }`}
          >
            Payment Method
          </div>
          <div
            onClick={() => handleSectionChange("Password Manager")}
            className={`cursor-pointer  mt-[40px] pl-5 text-[18px] font-normal cursor-pointer ${
              activeSection === "Password Manager"
                ? "border-l-[4px] border-[#F70000] pl-2"
                : "text-[#8B8B8B] "
            }`}
          >
            Password Manager
          </div>

          <div
            onClick={() => handleSectionChange("referral")}
            className={`cursor-pointer  mt-[40px] pl-5 text-[18px] font-normal cursor-pointer ${
              activeSection === "referral"
                ? "border-l-[4px] border-[#F70000] pl-2"
                : "text-[#8B8B8B] "
            }`}
          >
            Generate Referral link
          </div>

          <div
            onClick={handelLogout}
            className={`cursor-pointer  mt-[40px] pl-5  text-[18px] font-normal cursor-pointer   ${
              activeSection === "Logout"
                ? "border-l-[4px] border-[#F70000] pl-2"
                : "text-[#8B8B8B] "
            }`}
          >
            Logout
          </div>
        </div>
        <div className="rounded-3xl  lg:w-[77%] w-[100%] min-h-[454px] max-h-auto">
          {activeSection === "Personal Info" && (
            <form
              action={onEditProfile}
              style={{ boxShadow: "0px 4px 29px 0px #0000000A" }}
              className="rounded-3xl p-[30px] w-full "
            >
              <input
                type="file"
                id="profile"
                name="image"
                className="hidden"
                accept="image/*,capture=camera"
                onChange={handleFileChange}
              />
              <div className="relative w-[120px] h-[120px] rounded-full border-zinc-400 border-2">
                {profileImg ||
                  (currentUser?.profile?.image && (
                    <Image
                      alt="profile"
                      width={120}
                      height={120}
                      src={
                        profileImg ? profileImg : currentUser?.profile?.image
                      }
                      className="rounded-full w-[100%] h-[100%] absolute top-0 right-0"
                    />
                  ))}
                <label htmlFor="profile">
                  <FaCamera
                    className="absolute cursor-pointer text-black/65 top-[50%] right-[50%] translate-x-[50%] translate-y-[-50%]"
                    size={30}
                  />
                </label>
              </div>
              {/* <Avatar className="w-[80px] h-[80px]" /> */}
              <div className="flex flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap items-center gap-4  ">
                <div className="flex-col mt-[30px] lg:w-[50%] w-[100%] sm:w-[100%] md:w-[100%]">
                  <label className="text-[16px] font-semibold">
                    First Name *
                  </label>
                  <input
                    placeholder="Enter Name "
                    name="first_name"
                    defaultValue={currentUser?.profile?.first_name}
                    className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                  />
                </div>
                <div className="flex-col mt-[30px] lg:w-[50%] w-[100%] sm:w-[100%] md:w-[100%]">
                  <label className="text-[16px] font-semibold">
                    Last Name *
                  </label>
                  <input
                    placeholder="Enter Name "
                    name="last_name "
                    defaultValue={currentUser?.profile?.last_name}
                    className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex-col mt-[30px]">
                <label className="text-[16px] font-semibold">Address</label>
                <input
                  placeholder="Enter Address"
                  name="address"
                  defaultValue={currentUser?.profile?.address}
                  className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                />
              </div>
              <div className="flex-col mt-[30px]">
                <label className="text-[16px] font-semibold">
                  Phone Number *
                </label>
                <input
                  placeholder="Enter Phone Number"
                  type="tel"
                  name="phone"
                  defaultValue={currentUser?.profile?.phone}
                  className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                />
              </div>
              <div className="flex-col mt-[30px]">
                <label className="text-[16px] font-semibold"> Gender *</label>
                <select className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none">
                  <option>Male</option>
                  <option>FeMale</option>
                </select>
              </div>
              <div className="flex flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap items-center justify-between mt-[30px]">
                <button
                  type="submit"
                  disabled={isPending}
                  className=" bg-[#F70000] disabled:bg-zinc-400 disabled:text-zinc-200 disabled:border-none rounded-2xl h-[50px]  lg:w-[181px] w-[100%] text-[18px] font-medium text-white"
                >
                  Update Change
                </button>
                <div className="flex items-center lg:mt-0  mt-3 sm:mt-3">
                  <MdOutlineDeleteOutline
                    className="text-[#F70000] lg:text-[28px] text-[20px] sm:text-[20px]  mr-[16px]"
                    onClick={handleOpenModelDelete}
                  />
                  <p className="cursor-pointer text-[#F70000] lg:text-[16px] text-[12px] sm:text-[14px] font-semibold mr-[16px]">
                    Delete Account
                  </p>
                </div>
              </div>
              <CustomModal showModal={showModelDelete}>
                <div className=" w-[620px] p-6">
                  <p className="text-[40px] text-center font-bold text-[#777777]">
                    Delete Account
                  </p>
                  <p className="text-[20px]  font-medium text-[#777777] mt-[32px]">
                    Deleting your account may remove all your information From
                    our database, this can not be undone.
                  </p>
                  <p className="text-[15px] font-normal text-[#777777] mt-[18px]">
                    To Confirm this ype ‘Delete’
                  </p>
                  <div className="flex items-center gap-4 mt-[4px]">
                    <input className="border-[1px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"></input>
                    <button
                      className=" bg-[#F70000] rounded-2xl h-[50px] w-[275px] text-[18px] font-medium text-white"
                      onClick={handleCloseModelDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </CustomModal>
            </form>
          )}

          {activeSection === "Orders" &&
            userOrders?.map((item, index) => (
              <MyorderCard key={index} order={item} />
            ))}

          {activeSection === "Manage Address" && (
            <>
              <form>
                {allAddress?.map((item, index) => (
                  <div
                    style={{ boxShadow: "0px 4px 29px 0px #0000000A" }}
                    className="rounded-3xl p-[20px] w-full h-auto hover:border-[#F70000] border-[1px] "
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-[24px] font-medium ">
                        {item?.address_label?.toUpperCase()}
                      </p>
                      <Radio
                        sx={{
                          color: "#F70000",
                          "& .MuiSvgIcon-root": {
                            fontSize: 34,
                          },
                          "&.Mui-checked": {
                            color: "#F70000",
                          },
                        }}
                        checked={addressId === item?.id ? true : false}
                        onChange={() => setAddressId(item?.id)}
                      />
                    </div>
                    <div className="flex items-center ">
                      <Image
                        src={Home}
                        alt=""
                        className="w-[50px] h-[50px] mr-4"
                      />
                      <div>
                        <p>
                          <span className="text-[16px] font-semibold ">
                            {item?.recipient_name}
                          </span>
                          <span className="text-[15px] font-medium text-[#777777] ">
                            (item?.recipient_phone)
                          </span>
                        </p>
                        <p className="text-[14px] mt-2 font-medium text-[#777777] ">
                          {item?.address}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center ">
                        <Image
                          src={Location}
                          alt=""
                          className="w-[18px] h-[23px] mr-2"
                        />
                        <p className="text-[14px] mt-2 font-medium text-[#777777] ">
                          New, York
                        </p>
                      </div>
                      <div className="flex items-center ">
                        <div className="flex items-center justify-center border-[1px] border-[#BABABA] rounded-md w-[35px] h-[35px] mr-3">
                          <FiEdit className="h-[20px] w-[20px] text-[#BABABA]" />
                        </div>
                        <div
                          onClick={() => onDeleteAddress(item?.id)}
                          style={{ pointerEvents: `${isPending} && "none"` }}
                          className="flex cursor-pointer items-center justify-center border-[1px] border-[#BABABA] rounded-md w-[35px] h-[35px] "
                        >
                          <MdOutlineDeleteOutline className="h-[20px] w-[20px] text-[#BABABA]" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* <div
                  style={{ boxShadow: "0px 4px 29px 0px #0000000A" }}
                  className="rounded-3xl p-[20px] w-full h-auto mt-[20px] hover:border-[#F70000] border-[1px] "
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[24px] font-medium ">Appartment</p>
                    <Radio
                      sx={{
                        color: "#F70000",
                        "& .MuiSvgIcon-root": {
                          fontSize: 34,
                        },
                        "&.Mui-checked": {
                          color: "#F70000",
                        },
                      }}
                    />
                  </div>
                  <div className="flex items-center ">
                    <Image
                      src={Appartment}
                      alt=""
                      className="w-[50px] h-[50px] mr-4"
                    />
                    <div>
                      <p>
                        <span className="text-[16px] font-semibold ">
                          {" "}
                          James Williams
                        </span>
                        <span className="text-[15px] font-medium text-[#777777] ">
                          (+098766677)
                        </span>
                      </p>
                      <p className="text-[14px] mt-2 font-medium text-[#777777] ">
                        House # H11 Sector 45/A, Road Newyork
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center ">
                      <Image
                        src={Location}
                        alt=""
                        className="w-[18px] h-[23px] mr-2"
                      />
                      <p className="text-[14px] mt-2 font-medium text-[#777777] ">
                        New, York
                      </p>
                    </div>
                    <div className="flex items-center ">
                      <div className="flex items-center justify-center border-[1px] border-[#BABABA] rounded-md w-[35px] h-[35px] mr-3">
                        <FiEdit className="h-[20px] w-[20px] text-[#BABABA]" />
                      </div>
                      <div className="flex items-center justify-center border-[1px] border-[#BABABA] rounded-md w-[35px] h-[35px] ">
                        <MdOutlineDeleteOutline className="h-[20px] w-[20px] text-[#BABABA]" />
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* <div
                  style={{ boxShadow: "0px 4px 29px 0px #0000000A" }}
                  className="rounded-3xl p-[20px] w-full mt-[20px] h-auto hover:border-[#F70000] border-[1px] "
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[24px] font-medium ">Office</p>
                    <Radio
                      sx={{
                        color: "#F70000",
                        "& .MuiSvgIcon-root": {
                          fontSize: 34,
                        },
                        "&.Mui-checked": {
                          color: "#F70000",
                        },
                      }}
                    />
                  </div>
                  <div className="flex items-center ">
                    <Image
                      src={Office}
                      alt=""
                      className="w-[50px] h-[50px] mr-4"
                    />
                    <div>
                      <p>
                        <span className="text-[16px] font-semibold ">
                          {" "}
                          James Williams
                        </span>
                        <span className="text-[15px] font-medium text-[#777777] ">
                          (+098766677)
                        </span>
                      </p>
                      <p className="text-[14px] mt-2 font-medium text-[#777777] ">
                        House # H11 Sector 45/A, Road Newyork
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center ">
                      <Image
                        src={Location}
                        alt=""
                        className="w-[18px] h-[23px] mr-2"
                      />
                      <p className="text-[14px] mt-2 font-medium text-[#777777] ">
                        New, York
                      </p>
                    </div>
                    <div className="flex items-center ">
                      <div className="flex items-center justify-center border-[1px] border-[#BABABA] rounded-md w-[35px] h-[35px] mr-3">
                        <FiEdit className="h-[20px] w-[20px] text-[#BABABA]" />
                      </div>
                      <div className="flex items-center justify-center border-[1px] border-[#BABABA] rounded-md w-[35px] h-[35px] ">
                        <MdOutlineDeleteOutline className="h-[20px] w-[20px] text-[#BABABA]" />
                      </div>
                    </div>
                  </div>
                </div> */}
              </form>
              <form
                action={onCreateAddress}
                style={{ boxShadow: "0px 4px 29px 0px #0000000A" }}
                className="rounded-3xl p-[30px] w-full mt-6 "
              >
                <p className="text-[24px] font-semibold">Add New Address</p>
                <div className="flex flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap   items-center gap-4  ">
                  <div className="flex-col mt-[30px] lg:w-[50%] w-[100%] sm:w-[100%] md:w-[100%]">
                    <label className="text-[16px] font-semibold">Name</label>
                    <input
                      placeholder="Enter Your Name "
                      name="recipient_name"
                      required
                      className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex-col mt-[30px]">
                  <label className="text-[16px] font-semibold">
                    Address Title
                  </label>
                  <input
                    placeholder="Address Title e.g Home/Office etc"
                    required
                    name="address_label"
                    className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                  />
                </div>
                {/* <div className="flex-col mt-[30px]">
                  <label className="text-[16px] font-semibold">
                    
                    Country 
                  </label>
                  <select className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none">
                    <option>Pakistan</option>
                    <option>China</option>
                  </select>
                </div> */}
                <div className="flex-col mt-[30px]">
                  <label className="text-[16px] font-semibold">
                    Street Address
                  </label>
                  <input
                    placeholder="Address"
                    name="address"
                    required
                    className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                  />
                </div>
                {/* <div className="flex-col mt-[30px]">
                  <label className="text-[16px] font-semibold"> City *</label>
                  <select className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none">
                    <option>Lahore</option>
                    <option>Multan</option>
                  </select>
                </div> */}
                {/* <div className="flex-col mt-[30px]">
                  <label className="text-[16px] font-semibold">
                  
                    State * *
                  </label>
                  <select className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none">
                    <option>State *A</option>
                    <option>State *B</option>
                  </select>
                </div> */}
                {/* <div className="flex-col mt-[30px]">
                  <label className="text-[16px] font-semibold">
                    Zip Code *
                  </label>
                  <input
                    placeholder="Zip Code *"
                    className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                  />
                </div> */}
                <div className="flex-col mt-[30px]">
                  <label className="text-[16px] font-semibold">
                    Phone Number
                  </label>
                  <input
                    placeholder="Phone Number"
                    name="recipient_phone"
                    required
                    className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                  />
                </div>
                <div className="flex-col mt-[30px]">
                  <label className="text-[16px] font-semibold">Note</label>
                  <input
                    placeholder="Note"
                    name="note"
                    required
                    className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                  />
                </div>
                {/* <div className="flex-col mt-[30px]">
                  <label className="text-[16px] font-semibold">
                    Email Address
                  </label>
                  <input
                    placeholder="Email Address"
                    className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                  />
                </div> */}
                <div className=" mt-[30px]">
                  <button
                    disabled={isPending}
                    type="submit"
                    className=" bg-[#F70000] disabled:bg-zinc-400 disabled:text-zinc-200 disabled:border-none rounded-2xl h-[50px]  w-[181px] text-[18px] font-medium text-white"
                  >
                    Add Address
                  </button>
                </div>
              </form>
            </>
          )}
          {activeSection === "Payment Method" && (
            <div>
              <div
                style={{ boxShadow: " 0px 4px 29px 0px #0000000A" }}
                className="w-full rounded-3xl border-[1px] border-[#00000014] p-[16px]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-[#191919]">
                    <Image
                      src={PayPal}
                      alt=""
                      className="w-[36px] h-[36px] mr-[20px]"
                    />
                    <p className="text-[16px] font-medium">Paypal</p>
                  </div>
                  <p className="text-[16px] font-medium">Link Account</p>
                </div>
              </div>
              <div
                style={{ boxShadow: " 0px 4px 29px 0px #0000000A" }}
                className="w-full rounded-3xl mt-[16px] border-[1px] border-[#00000014] p-[16px]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-[#191919]">
                    <Image
                      src={Visa}
                      alt=""
                      className="w-[36px] h-[36px] mr-[20px]"
                    />
                    <p className="text-[16px] font-medium">Paypal</p>
                  </div>
                  <p className="text-[16px] font-medium">Link Account</p>
                </div>
              </div>
              <div
                style={{ boxShadow: " 0px 4px 29px 0px #0000000A" }}
                className="w-full rounded-3xl mt-[16px] border-[1px] border-[#00000014] p-[16px]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-[#191919]">
                    <Image
                      src={Google}
                      alt=""
                      className="w-[36px] h-[36px] mr-[20px]"
                    />
                    <p className="text-[16px] font-medium">Paypal</p>
                  </div>
                  <p className="text-[16px] font-medium">Link Account</p>
                </div>
              </div>
              <div
                style={{ boxShadow: " 0px 4px 29px 0px #0000000A" }}
                className="w-full rounded-3xl mt-[16px] border-[1px] border-[#00000014] p-[16px]"
              >
                <div className="flex items-center">
                  <div className="rounded-full border-[0.5px] border-[#00000014] w-[20px] h-[20px]"></div>
                  <Image
                    src={Card}
                    alt=""
                    className="w-[24px] h-[20px] mr-[20px] ml-4"
                  />
                  <p className="text-[16px] font-medium text-[#777777]">
                    Add New Credit/Debit Card
                  </p>
                </div>
                <div className="flex-col mt-[20px]">
                  <label className="text-[16px] font-semibold">
                    {" "}
                    Create New Password *
                  </label>
                  <input
                    placeholder="Enter Password"
                    className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                  />
                </div>{" "}
                <div className="flex-col mt-[20px]">
                  <label className="text-[16px] font-semibold">
                    {" "}
                    Create New Password *
                  </label>
                  <input
                    placeholder="Enter Password"
                    className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                  />
                </div>
                <div className="flex flex-wrap sm:flex-wrap md:flex-wrap lg:flex-nowrap items-center gap-4">
                  <div className="flex-col mt-[20px] lg:w-[50%] w-[100%] sm:w-[100%] md:w-[100%]">
                    <label className="text-[16px] font-semibold">
                      {" "}
                      Create New Password *
                    </label>
                    <input
                      placeholder="Enter Password"
                      className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                    />
                  </div>
                  <div className="flex-col mt-[20px] lg:w-[50%] w-[100%] sm:w-[100%] md:w-[100%]">
                    <label className="text-[16px] font-semibold">
                      {" "}
                      Create New Password *
                    </label>
                    <input
                      placeholder="Enter Password"
                      className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    sx={{
                      color: "#F70000",
                      "& .MuiSvgIcon-root": {
                        fontSize: 34,
                      },
                      "&.Mui-checked": {
                        color: "#F70000",
                      },
                    }}
                  />
                  <p className="text-[14px] font-medium text-[#777777]">
                    Save card for future payment
                  </p>
                </div>
                <button className=" bg-[#F70000] rounded-full h-[50px] mt-[30px] w-[275px] text-[18px] font-medium text-white">
                  Add Payment
                </button>
              </div>
            </div>
          )}

          {activeSection === "referral" && (
            <div>
              <p className="text-[16px] font-medium text-[#777777]">
                Referral Link
              </p>
              <input
                value={referralLink}
                readOnly
                className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
              />
              <button
                type="button"
                onClick={generateRefLink}
                className=" bg-[#F70000] rounded-full mx-auto h-[50px] mt-[30px] w-[275px] text-[18px] font-medium text-white"
              >
                {pending ? (
                  <BiLoader className="animate-spin h-5 w-5 mx-auto" />
                ) : (
                  "Generate"
                )}
              </button>
            </div>
          )}
          {activeSection === "Password Manager" && (
            <form
              action={onEditPassword}
              style={{ boxShadow: "0px 4px 29px 0px #0000000A" }}
              className="rounded-3xl p-[30px] w-full "
            >
              <div className="flex-col">
                <label className="text-[16px] font[semibold"> Password *</label>
                <input
                  placeholder="Enter Password"
                  name="old_password"
                  required
                  min={8}
                  className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                />
              </div>
              <div className="flex-col mt-[30px]">
                <label className="text-[16px] font-semibold">
                  New Password *
                </label>
                <input
                  placeholder="Enter Password"
                  name="new_password"
                  required
                  min={8}
                  className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                />
              </div>
              <div className="flex-col mt-[30px]">
                <label className="text-[16px] font-semibold">
                  Confirm Password *
                </label>
                <input
                  placeholder="Enter Password"
                  name="cPassword"
                  required
                  min={8}
                  className="border-[1px] mt-[9px] border-[#7777777]  w-full rounded-md h-[50px] p-3 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isPending}
                className=" bg-[#F70000] disabled:bg-zinc-400 disabled:text-zinc-200 disabled:border-none rounded-full h-[50px] mt-[30px] w-[275px] text-[18px] font-medium text-white"
              >
                Update Password
              </button>
            </form>
          )}
          {activeSection === "Logout" && (
            <>
              <CustomModal showModal={showSendModel}>
                <form action={onLogout} className=" w-[400px] p-6">
                  <p className="text-[50px] text-center font-bold text-[#191919]">
                    Logout
                  </p>
                  <p className="text-[24px] text-center font-bold text-[#777777] mt-[16px]">
                    Are yodivu sure you want to log out?
                  </p>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className=" bg-[#F70000]  rounded-full h-[50px] mt-[24px] w-[275px] text-[18px] font-medium text-white"
                    >
                      Yes, Logout
                    </button>
                  </div>
                </form>
              </CustomModal>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
