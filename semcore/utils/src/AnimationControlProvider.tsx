import React from 'react';

type AnimationControl = 'animations-disabled' | 'animations-enabled';
export const animationControlContext = React.createContext<AnimationControl | undefined>(undefined);


const useInternalAnimationControlContext = (override: AnimationControl | undefined) => {
  const context = React.useContext(animationControlContext);
  const initValue = React.useMemo(() => {
    if (context) return context;
    if (override) return override;
    if (!window) return 'animations-disabled';
    return window.matchMedia('(prefers-reduced-motion: reduce)')?.matches ? 'animations-disabled' : 'animations-enabled';
  }, [context, override])
  const [value, setValue] = React.useState(initValue);

  React.useEffect(() => {
    if (context) return;
    if (override) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMediaQueryChange = () => setValue(mediaQuery?.matches ? 'animations-disabled' : 'animations-enabled');
    handleMediaQueryChange();
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, [context, override])

  return override || context || value
}

export const useAnimationControlContext = () => {
  return useInternalAnimationControlContext(undefined);
}

export const WithAnimationControl = <Props extends {
  animationControl: AnimationControl
}>(Component: React.FC<Props>): React.FC<Props> => {
  return ((props) => {
    const animationControl = useAnimationControlContext();
    return <Component {...props} animationControl={animationControl} />
  }) as any
}


export const AnimationControlProvider: React.FC<{ children: React.ReactNode; disable: 'always' | 'when-reduce-motion-preferred' }> = ({ children, disable }) => {
  const override = React.useMemo(() => disable === 'always' ? 'animations-disabled' as const : undefined, [disable]);
  const animationControl = useInternalAnimationControlContext(override);

  return <animationControlContext.Provider value={animationControl}>{children}</animationControlContext.Provider>
}