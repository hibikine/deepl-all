import React, { useCallback, ReactEventHandler, SyntheticEvent, useState } from 'react';
import { useDebounce } from 'react-use';
import Store from 'electron-store';

import { Container, Image, Text } from './styles'

const store = new Store({
  schema: {
    deeplKey: {
      type: 'string',
    }
  }
});

const useDeeplKey = (): [deeplKey: string, onChangeDeeplKey: ReactEventHandler<HTMLInputElement>] => {
  const [deeplKey, setDeeplKey] = useState<string>((store.get('deeplKey') as string) || '');
  const onChangeDeeplKey: ReactEventHandler<HTMLInputElement> = useCallback((e: SyntheticEvent<HTMLInputElement, Event>) => {
    setDeeplKey(e.currentTarget.value)
  }, [setDeeplKey]);
  useDebounce(() => {
    store.set('deeplKey', deeplKey);
  },1000, [deeplKey]);
  return [deeplKey, onChangeDeeplKey];
}

const Greetings: React.FC = () => {
  const [deeplKey, onChangeDeeplKey] = useDeeplKey();
  return (
    <Container>
      <input value={deeplKey} onChange={onChangeDeeplKey}/>
      <Image
        src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"
        alt="ReactJS logo"
      />
      <Text>An Electron boilerplate including TypeScript, React, Jest and ESLint.</Text>
    </Container>
  )
}

export default Greetings
