export const getBackgroundColor = (status: number): string => {
    switch (status) {
      case 0:
        return "#FF6B6B"; // Soft Red
      case 1:
        return "#FFB74D"; // Warm Orange
      case 2:
        return "#FFD54F"; // Bright Yellow
      case 3:
        return "#81C784"; // Light Green
      case 4:
        return "#4DB6AC"; // Teal Green
      case 5:
        return "#388E3C"; // Dark Green
      default:
        return "transparent";
    }
  };