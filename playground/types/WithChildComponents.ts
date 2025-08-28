export type WithChildComponents<ChildComponents extends string> = React.FC<any> & { [key in ChildComponents]: React.FC<any> };
