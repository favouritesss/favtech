import React, { createContext, useContext, useState, useEffect } from 'react';

const BrandContext = createContext();

import { publicService } from '../services/api';

export const BrandProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    site_name: 'FavTech',
    site_title: 'Premium SMM Platform',
    currency_symbol: '₦',
    logo_url: null,
    enable_registration: true
  });

  const fetchSettings = async () => {
    try {
      const res = await publicService.getSettings();
      setSettings(res.data);
    } catch (err) {
      console.error('Failed to load branding');
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    document.title = `${settings.site_name} - ${settings.site_title}`;
  }, [settings]);

  return (
    <BrandContext.Provider value={{ settings, updateSettingsLocal: setSettings, refreshSettings: fetchSettings }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => useContext(BrandContext);
