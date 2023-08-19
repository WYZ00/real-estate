import { useParams } from "react-router-dom";
import "./Property.css";
import { useMutation, useQuery } from "react-query";
import { getProperty, removeBooking } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import { AiFillHeart, AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import { FaShower } from "react-icons/fa";
import Map from "../../components/Map/Map";
import { useContext, useState } from "react";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../../components/BookingModal/BookingModal";
import userDetailContext from "../../context/UserDetailContext";
import { Button } from "@mantine/core";
import { toast } from "react-toastify";
import Heart from "../../components/Heart/Heart";

const Property = () => {
  const { propertyId } = useParams();

  const { data, isLoading, isError } = useQuery(
    ["resd", propertyId],
    () => getProperty(propertyId),
    {
      refetchOnWindowFocus: false,
    }
  );

  const [modalOpened, setModalOpened] = useState(false);
  const { validateLogin } = useAuthCheck();
  const { user } = useAuth0();

  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(userDetailContext);

  const { mutate: cancelBooking, isLoading: cancelling } = useMutation({
    mutationFn: () => removeBooking(propertyId, user?.email, token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking?.id !== propertyId),
      }));
      toast.success("Booking cancelled", { position: "bottom-right" });
    },
  });

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the property details</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* like button */}
        <div className="like">
          <Heart id={propertyId} />
        </div>

        {/* image */}
        <img src={data?.image} alt={data.title} />

        <div className="flexCenter property-details">
          {/* left side */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                ${data?.price}
              </span>
            </div>

            {/* facilities */}
            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="#1f3e72" />
                <span>{data?.facilities.bathrooms} Bathrooms</span>
              </div>
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1f3e72" />
                <span>{data?.facilities.parkings} Parking</span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="1f3e72" />
                <span>{data?.facilities.bedrooms} Rooms</span>
              </div>
            </div>

            {/* description */}
            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            {/* address */}

            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">
                {data?.address}
                <br />
                {data?.city}
                <br />
                {data?.country}
              </span>
            </div>

            {/* booking button */}
            {bookings?.map((booking) => booking.id).includes(propertyId) ? (
              <>
                P
                <Button
                  variant="outline"
                  w={"100%"}
                  color="red"
                  onClick={() => cancelBooking()}
                  disabled={cancelling}>
                  <span>Cancel booking</span>
                </Button>
                <span>
                  Your visit already booked for date{" "}
                  {
                    bookings?.filter((booking) => booking?.id === propertyId)[0]
                      .date
                  }
                </span>
              </>
            ) : (
              <button
                className="button"
                onClick={() => {
                  validateLogin() && setModalOpened(true);
                }}>
                Book your visit
              </button>
            )}

            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={propertyId}
              email={user?.email}
            />
          </div>

          {/* right side */}
          <div className="map">
            <Map
              address={data?.address}
              city={data?.city}
              country={data?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Property;
