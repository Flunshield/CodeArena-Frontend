import React from 'react';

interface FooterProps {
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer style={{ backgroundColor: '#f8f9fa', padding: '1rem', textAlign: 'center', borderTop: '1px solid #e7e7e7' }}>
      <p>{"Ici c'est le footer"} © {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;
