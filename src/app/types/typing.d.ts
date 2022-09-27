declare module '*.module.scss' {
    interface IClassNames {
      [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
  }
// declare module '*.module.scss' {
// 	const classes: { [key: string]: string };
// 	export default classes;
// }