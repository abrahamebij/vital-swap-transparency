const Footer = () => {
  return (
    <footer className="flex justify-between items-center px-6 py-2">
      <a href="https://app.vitalswap.com" target="_blank">
      <img src="/vitalswap_logo_alt.png" className="w-28" />
      </a>
      <p>
        Copyright © {new Date().getFullYear()} VitalSwap. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
