export const isUpcomingDate = (date: Date): boolean => {
    return new Date(date) >= new Date();
  };
  
  export const isCompletedDate = (date: Date): boolean => {
    return new Date(date) < new Date();
  };
  