export const triggerContactEmail = (subject: string) => {
  const email = "contacto@nexergy.ar";
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
};
