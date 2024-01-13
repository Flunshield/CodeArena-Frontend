import React from 'react';

interface FooterProps {
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer>
        <div className="relative w-full h-full bottom-0 text-center text-white">
      <p>{"Ici c'est le footer"} © {new Date().getFullYear()}</p>
        </div>
    </footer>
  );
};

export default Footer;
