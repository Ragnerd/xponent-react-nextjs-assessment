declare module "@/components/ui/button" {
  import React from "react";
  const Button: React.ComponentType<any>;
  export { Button };
  export default Button;
}

declare module "@/components/ui/card" {
  import React from "react";
  export const Card: React.ComponentType<any>;
  export const CardHeader: React.ComponentType<any>;
  export const CardContent: React.ComponentType<any>;
  export const CardFooter: React.ComponentType<any>;
  export default Card;
}
