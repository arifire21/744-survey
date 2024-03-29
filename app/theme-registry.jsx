'use client';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import GlobalStyles from '@mui/joy/GlobalStyles';
import React from 'react';

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        background: {
          body: '#202020'
        },
        primary: {
          50: "#dff5fa",
          100: "#b0e6f2",
          200: "#7dd6e9",
          300: "#49c5de",
          400: "#23bad6",
          500: "#01a0bb",
          600: "#019fbb",
          700: "#008ba1",
          800: "#007789",
          900: "#00555e"
        }
      }
    }
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px'
        }
      }
    }, //end JoyButton
    JoyFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          flexWrap: 'nowrap'  //stop required stars from shifting to next line
        }
      }
    }, //end JoyFormLabel
    JoyModalDialog: {
      defaultProps: { layout: 'fullscreen-padded' },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.layout === 'fullscreen-padded' && {
              width: '90vw',
              height: '50vh',
              padding: '1rem 0.55rem'
          }),
        }),
      }
    } //end JoyModalDialog
  }
})

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry(props) {
  const { options, children } = props;

  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <CssVarsProvider theme={theme} defaultMode="dark">
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              padding: '1rem'
            }
          }}
          />
            {children}
      </CssVarsProvider>
    </CacheProvider>
  );
}