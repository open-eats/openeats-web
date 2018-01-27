export default title => {
  const nextTitle = title ? title + ' | Open Eats' : 'Open Eats';
  if (nextTitle !== document.title) {
    document.title = nextTitle;
  }
}