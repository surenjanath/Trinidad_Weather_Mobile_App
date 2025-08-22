export const getCurrentTime = (): string => {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
};

export const getCurrentDate = (): string => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  return now.toLocaleDateString('en-US', options);
};

export const getDayAbbreviation = (dayOffset: number): string => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const targetDay = new Date(today);
  targetDay.setDate(today.getDate() + dayOffset);
  return days[targetDay.getDay()];
};
