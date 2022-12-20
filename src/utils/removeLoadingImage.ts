const removeLoadingImage = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
): void => {
  const element = event.target as Element;
  element.classList.remove('loading');
  element.classList.add('image');
};

export default removeLoadingImage;
