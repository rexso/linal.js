# linal.js
Object Oriented Linear Algebra Library in JavaScript.

All class methods have parameter checks to ensure type-safety. Sensible error messages are thrown if the user tries to provide methods with invalid arguments, or assign properties with erroneous values. For WebGL compatibility, all classes provide an **array**-property, which holds a Float32Array.

## Classes

* **linal.Vec2** - 2D Vector class
  * Functions:
    * add(value), accepting a scalar number or Vec2 as value
    * assign(xScalarOrVec2, y)
    * distance(vec2)
    * divide(value), accepting a scalar number or Vec2 as value
    * dot(vec2)
    * maximize(vec2)
    * minimize(vec2)
    * multiply(value), accepting a scalar number or Vec2 as value
    * normalize()
    * rotate(radians)
    * subtract(value), accepting a scalar number or Vec2 as value
    * swap(vec2)
    * toString()
  * Properties:
    * array - returns a Float32Array with the vector values
    * copy - returns a copy of the vector
    * length - returns the length of the vector
    * normalized - returns a normalized version of the vector
    * x - returns the x value (first element) of the vector
    * y - returns the y value (second element) of the vector

* **linal.Vec3** - 3D Vector class
  * Functions:
    * add(value), accepting a scalar number or Vec3 as value
    * angle(vec3)
    * assign(xScalarOrVec3, y, z)
    * cross(vec3)
    * distance(vec3)
    * divide(value), accepting a scalar number, Vec3, Mat33 or Mat44 as value
    * dot(vec3)
    * maximize(vec3)
    * minimize(vec3)
    * multiply(value), accepting a scalar number, Vec3, Mat33 or Mat44 as value
    * normalize()
    * rotateX(radians)
    * rotateY(radians)
    * rotateZ(radians)
    * subtract(value), accepting a scalar number or Vec3 as value
    * swap(vec3)
    * toString()
  * Properties:
    * array - returns a Float32Array with the vector values
    * copy - returns a copy of the vector
    * length - returns the length of the vector
    * normalized - returns a normalized version of the vector
    * x - returns the x value (first element) of the vector
    * xy - returns a Vec2 instance of x and y
    * xz - returns a Vec2 instance of x and z
    * y - returns the y value (second element) of the vector
    * yz - returns a Vec2 instance of y and z
    * z - returns the z value (third element) of the vector

* **linal.Vec4** - 4D Vector class
  * Functions:
    * add(value), accepting a scalar number or Vec4 as value
    * assign(xScalarOrVec, y, z, w)
    * divide(value), accepting a scalar number, Vec4 or Mat44 as value
    * dot(vec4)
    * maximize(vec4)
    * minimize(vec4)
    * multiply(value), accepting a scalar number, Vec4 or Mat44 as value
    * normalize()
    * subtract(value), accepting a scalar number or Vec4 as value
    * swap(vec4)
    * toString()
  * Properties:
    * array - returns a Float32Array with the vector values
    * copy - returns a copy of the vector
    * length - returns the length of the vector
    * normalized - returns a normalized version of the vector
    * x - returns the x value (first element) of the vector
    * xy - returns a Vec2 instance of x and y
    * xyz - returns a Vec3 instance of x, y and z
    * xyw - returns a Vec3 instance of x, y and w
    * xz - returns a Vec2 instance of x and z
    * xzw - returns a Vec3 instance of x, z and w
    * xw - returns a Vec2 instance of x and w
    * y - returns the y value (second element) of the vector
    * yz - returns a Vec2 instance of y and z
    * yzw - returns a Vec3 instance of y, z and w
    * yw - returns a Vec2 instance of y and w
    * z - returns the z value (third element) of the vector
    * zw - returns a Vec2 instance of z and w
    * w - returns the w value (fourth element) of the vector

* **linal.Mat33** - 3x3 Matrix class
  * Functions:
    * assign(value), accepting a scalar number, Mat33, Mat44 or array[9] as value
    * assignIdentity()
    * element(colOrIndex, row)
    * invert()
    * multiply(value), accepting a scalar number, Mat33 or Mat44 as value
    * toString()
    * transpose()
  * Properties:
    * array - returns a Float32Array with the matrix values
    * copy - returns a copy of the matrix
    * determinant - returns the determinant of the matrix
    * inverse - returns the inverse version of the matrix
    * transposed - returns the transposed version of the matrix

* **linal.Mat44** - 4x4 Matrix class
  * Functions:
    * assign(value), accepting a scalar number, Mat33, mat44 or array[16] as value
    * assignIdentity()
    * element(colOrIndex, row)
    * frustum(left, right, bottom, top, near, far)
    * invert()
    * multiply(value), accepting a scalar number, Mat33 or Mat44 as value
    * ortho(left, right, bottom, top, near, far)
    * perspective(verticalViewAngle, aspectRatio, near, far)
    * rotate(radians, xOrVec3, y, z)
    * scale(xOrVec3, y, z)
    * toString()
    * translate(xOrVec3, y, z)
    * transpose()
  * Properties:
    * array - returns a Float32Array with the matrix values
    * copy - returns a copy of the matrix
    * determinant - returns the determinant of the matrix
    * inverse - returns the inverse version of the matrix
    * translation - returns a Vec3 instance of the matrix translation
    * transposed - returns the transposed version of the matrix

## Examples

Basic Vector usage:
 ```javascript
var a = new linal.Vec3(1, 2, 3);       // Create a new Vec3 instance with values 1, 2, 3
var b = new linal.Vec3(1.5, 2.5, 3.5); // Create a new Vec3 instance with values 1.5, 2.5, 3.5
a.add(0.5);                            // Add scalar value 0.5 to a
a.multiply(b);                         // Multiplies a with b
a.toString();                          // Yields (2.25, 6.25, 12.25)
var c = b.xy;                          // Creates a new Vec2 instance with values 1.5, 2.5 (from b)
c.subtract(0.5).normalized.length;     // Subtracts 0.5 from c, and yields the normalized length
```

Basic Matrix usage:
```javascript
var a = new linal.Mat44();             // Create a new Mat44 instance (defaults to identity matrix)
var b = new linal.Vec3(0, 1, 0);       // Create a new Vec3 instance with values 0, 1, 0
a.translate(4, 0, 0).scale(2, 2, 2);   // Translates a 4 units along the x axis, and scales by 2
a.inverse.rotate(Math.PI, 0, 1, 0);    // Yields the inverse of a, rotated by PI around the y axis
a.copy.invert().rotate(Math.PI, b);    // Yields the same result as the previous operation
a.invert();                            // Inverts a (the previous operation did not modify a)
```

## Building
To initialize the build environment, and install the required node modules:
>npm install
 
To run JavaScript validation, and build the ***linal.min.js*** minimized version:
>gulp

## TODO
* Add Quaternion class, Quat
* Write tests for all classes
