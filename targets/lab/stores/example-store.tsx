import React from 'react';
import {EventRegister} from 'react-native-event-listeners';
import {GlobalEvents} from '../global/global-events';

interface ExampleModel {
  title: string;
}

let _exampleModel: ExampleModel = {
  title: 'Hi',
};

const exampleModel: ExampleModel = ((model: ExampleModel) => {
  return {
    get title() {
      return model.title;
    },
    set title(newTitle: string) {
      if (newTitle !== model.title) {
        model.title = newTitle;
        EventRegister.emit(GlobalEvents.StoreUpdated);
      }
    },
  };
})(_exampleModel);

interface ExampleModelContextType {
  exampleModel: ExampleModel;
}

const defaultExamppleModelContext = {
  exampleModel,
};

const ExampleModelContext = React.createContext<ExampleModelContextType>(
  defaultExamppleModelContext,
);

// https://stackoverflow.com/a/66717507/7455975
// export const myObserver =
//   <Props extends object>(
//     Component: React.ComponentType<Props>,
//   ): React.FC<Props> =>
//   props =>
//     (
//       <>
//         <Component {...props} />
//       </>
//     );
export const myObserver = <Props extends object>(
  Component: React.ComponentType<Props>,
): React.FC<Props> => {
  return props => {
    const [refresh, setRefresh] = React.useState(0);
    React.useEffect(() => {
      const listener = EventRegister.addEventListener(
        GlobalEvents.StoreUpdated,
        () => {
          setRefresh(refresh + 1);
        },
      );
      return () => {
        EventRegister.removeEventListener(listener as string);
      };
    }, [refresh]);
    return (
      <ExampleModelContext.Provider value={defaultExamppleModelContext}>
        <Component {...props} />
      </ExampleModelContext.Provider>
    );
  };
};

export const useExampleStore = () => {
  return React.useContext(ExampleModelContext);
};
