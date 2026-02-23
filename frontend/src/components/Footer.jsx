function Footer() {
  const today = new Date();
  const year = today.getFullYear();
  return <div className="text-center">&copy; {year}, Broadway</div>;
}
export default Footer;
