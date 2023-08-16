import "./Footer.css";

const Footer = () => {
  return (
    <section className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/* left side */}
        <div className="flexColStart f-left">
          <img src="./logo2.png" alt="logo2" width={120} />
          <span className="secondaryText">
            Our vision is to make all people <br />
            The best place to live for them.
          </span>
        </div>
        {/* right side */}
        <div className="flexColStart f-right">
          <span className="primaryText">Infomation</span>
          <span className="secondaryText">145 New york,FL 2145,USA</span>
          <div className="flexCenter f-menu">
            <span>Property</span>
            <span>Services</span>
            <span>Product</span>
            <span>About Us</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
