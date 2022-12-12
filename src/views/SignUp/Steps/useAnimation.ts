interface IProgressAnimation {
  setProgress: Function;
  onEnd: Function;
  animationDuration: number;
  offset: number;
  incrementAmount: number;
}

export default function ProgressAnimation({
  setProgress,
  offset,
  onEnd,
  animationDuration,
  incrementAmount,
}: IProgressAnimation) {
  for (let i = 0; i < animationDuration / offset; i++) {
    setTimeout(() => {
      setProgress(incrementAmount * i);
    }, offset * i);
  }
  setTimeout(() => {
    onEnd();
    setProgress(0);
  }, animationDuration);
}
