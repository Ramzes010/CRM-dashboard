
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaInstagram, FaTelegram } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center py-[1vw] px-[3.056vw] max-md:flex-col-reverse max-md:items-start">
      <div className="flex gap-[0.278vw] items-center text-[0.833vw] uppercase">
        <span className="text-[rgba(255,255,255,0.45)] mr-[1.111vw] max-md:text-[3.2vw] max-md:mr-[7.167vw]">Picheni © {new Date().getFullYear()}</span>
        <Link href="/terms" className="text-[rgba(255,255,255,0.6)] mr-[1.111vw]  hover:text-white transition-colors max-md:text-[3.2vw] max-md:mr-[7.167vw]">terms</Link>
        <Link href="/privacy" className="text-[rgba(255,255,255,0.6)] mr-[1.111vw] hover:text-white transition-colors max-md:text-[3.2vw] max-md:mr-[7.167vw]">privacy</Link>
        <Link href="/help" className="text-[rgba(255,255,255,0.6)] hover:text-white transition-colors max-md:text-[3.2vw] max-md:mr-[7.167vw]">help</Link>
      </div>
      <div className="flex gap-[0.208vw] max-md:mb-[8.533vw]">
        <a 
          href="https://instagram.com/picheni" 
          className="cursor-pointer max-md:mr-[1.389vw] hover:opacity-80 transition-opacity" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Follow us on Instagram"
        >
          <img src="/images/icons/insta.svg" alt="/images/instagram.png" />
        </a>
        <a 
          href="https://t.me/picheni" 
          className="cursor-pointer hover:opacity-80 transition-opacity ml-[0.833vw]" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Join our Telegram channel"
        >
        <img src="/images/icons/telegram.svg" alt="/images/telegram.png" />
        </a>
      </div>
    </div>
  );
}