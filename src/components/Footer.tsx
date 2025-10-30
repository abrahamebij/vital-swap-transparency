const Footer = () => {
  return (
    <footer className="flex gap-x-6 flex-wrap gap-y-10 justify-around items-center px-6 py-2">
      <a href="https://app.vitalswap.com" target="_blank">
        <img src="/vitalswap_logo_alt.png" className="w-28" />
      </a>
      <p className="text-center">
        Copyright © {new Date().getFullYear()} VitalSwap. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
