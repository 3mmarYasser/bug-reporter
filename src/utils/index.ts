export const formatDate = (dateString: string): string => new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
}).format(new Date(dateString));

export const truncateUrl = (url: string, maxLength = 30): string => 
  url.length <= maxLength ? url : `${url.substring(0, maxLength)}...`;

export const showNotification = (message: string, container: HTMLElement, duration = 3000): void => {
  const notification = document.createElement("div");
  notification.className = "bug-reporter-notification";
  notification.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    ${message}
  `;

  container.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateY(20px)";

    setTimeout(() => notification.remove(), 300);
  }, duration);
};
  
  