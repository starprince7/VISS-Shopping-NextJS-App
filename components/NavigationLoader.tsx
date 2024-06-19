import React from 'react'
import { useRouter } from 'next/router'
import { Box, LinearProgress } from '@mui/material'

const LOADER_THRESHOLD = 250

export default function NavigationLoader(props: any) {
  const [isLoading, setLoading] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const start = () =>
      timer = setTimeout(() => setLoading(true), LOADER_THRESHOLD);

    const end = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      setLoading(false);
    };

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);

      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
  }, [router.events]);

  if (!isLoading) return null;

  return (
    <Box
      sx={{
        zIndex: 10020,
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100%',
      }}
    >
      <LinearProgress color='info' />
    </Box>
  );
}
