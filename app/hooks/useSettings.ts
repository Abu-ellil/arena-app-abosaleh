import { useState, useEffect } from 'react';

interface Settings {
  goldTicketPrice?: string;
  silverTicketPrice?: string;
  bronzeTicketPrice?: string;
  vipTicketPrice?: string;
  vvipTicketPrice?: string;
  platformFee?: string;
  taxRate?: string;
  currency?: string;
  supportEmail?: string;
  supportPhone?: string;
  whatsappNumber?: string;
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/settings');
        if (response.ok) {
          const data = await response.json();
          setSettings(data);
          setError(null);
        } else {
          setError('Failed to fetch settings');
        }
      } catch (err) {
        setError('Error fetching settings');
        console.error('Error fetching settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading, error };
}