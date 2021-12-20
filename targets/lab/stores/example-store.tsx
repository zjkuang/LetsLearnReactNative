import React from 'react';

interface ExampleModel {
  title: string;
}

let _setExampleModelState: React.Dispatch<React.SetStateAction<ExampleModel>>;

let _exampleModel: ExampleModel = {
  title: '',
};

const exampleModel: ExampleModel = ((model: ExampleModel) => {
  return {
    get title() {
      console.log('*** getter');
      return model.title;
    },
    set title(newTitle: string) {
      console.log('*** setter');
      if (newTitle !== model.title) {
        model.title = newTitle;
        console.log(
          '*** _setExampleModelState:',
          JSON.stringify(_setExampleModelState),
        );
        _setExampleModelState(model);
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
    const [, setExampleModelState] = React.useState<ExampleModel>({title: ''});
    console.log('*** update');
    React.useEffect(() => {
      _setExampleModelState = setExampleModelState;
      setExampleModelState(exampleModel);
      console.log(
        '*** setExampleModelState:',
        JSON.stringify(setExampleModelState),
      );
      console.log(
        '*** _setExampleModelState:',
        JSON.stringify(_setExampleModelState),
      );
    }, []);
    React.useEffect(() => {
      console.log(`*** exampleModel: ${JSON.stringify(exampleModel)}`);
    });
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
