var linal = { VERSION: "0.1.1" };

(function() {
	function definedNotNull(value) {
		return (value !== undefined && value !== null);
	}
	
	function isNumber(value) {
		return (typeof value === 'number' && !isNaN(value));
	}
	
	function isArray(value) {
		return (value instanceof Array || value instanceof Float32Array);
	}
	
	function indexOutOfRange(property, index, range) {
		return property + ' index out of range: ' + index + ', expected ' + range;
	}
	
	function invalidAssignment(property, value, expected) {
		return 'Invalid assigment of ' + property + ': ' + value + ' (' + typeof value + '), expected ' + expected;
	}
	
	function invalidParameter(parameter, value, expected, method) {
		return 'Invalid parameter \'' + parameter + '\' in ' + method + ': ' + value + ' (' + typeof value + '), expected ' + expected;
	}
	
	function Vector2(xScalarOrVec2, y) {
		// Define read-only member array
		Object.defineProperty(this, 'array', {
			value: new Float32Array([ 0, 0 ])
		});
		
		// Define members x and y
		[ 'x', 'y' ].forEach(function(property, index) {
			Object.defineProperty(this, property, {
				get: function() {
					return this.array[index];
				},
				set: function(value) {
					if(isNumber(value)) {
						this.array[index] = value;
					} else {
						throw invalidAssignment('Vector2.' + property, value, 'number');
					}
				}
			});
		}, this);
		
		// Call assign method if parameters are set
		if(definedNotNull(xScalarOrVec2)) {
			this.assign(xScalarOrVec2, y);
		}
	}
	
	Vector2.prototype = {
		add: function(value) {
			if(value instanceof Vector2) {
				this.x += value.x;
				this.y += value.y;
			} else if(isNumber(value)) {
				this.x += value;
				this.y += value;
			} else {
				throw invalidParameter('value', value, 'number or Vector2', 'Vector2.add');
			}
			
			return this;
		},
		
		assign: function(xScalarOrVec2, y) {
			if(xScalarOrVec2 instanceof Vector2) {
				return this.assign(xScalarOrVec2.x, xScalarOrVec2.y);
			} else if(isNumber(xScalarOrVec2) && !definedNotNull(y)) {
				return this.assign(xScalarOrVec2, xScalarOrVec2);
			} else {
				var args = [ 'x', 'y' ], x = xScalarOrVec2;
				
				[ x, y ].forEach(function(arg, index) {
					if(!isNumber(arg)) {
						throw invalidParameter(args[index], arg, 'number', 'Vector2.assign');
					}
				});
				
				this.x = x;
				this.y = y;
			}
			
			return this;
		},
		
		get copy() {
			return new Vector2(this);
		},
		
		distance: function(vec2) {
			if(vec2 instanceof Vector2) {
				var dx = this.x - vec2.x, dy = this.y - vec2.y;
				return Math.sqrt((dx * dx) + (dy * dy));
			} else {
				throw invalidParameter('vec2', vec2, 'Vector2', 'Vector2.distance');
			}
		},
		
		divide: function(value) {
			if(value instanceof Vector2) {
				this.x /= value.x;
				this.y /= value.y;
			} else if(isNumber(value)) {
				this.x /= value;
				this.y /= value;
			} else {
				throw invalidParameter('value', value, 'number or Vector2', 'Vector2.divide');
			}
			
			return this;
		},
		
		dot: function(vec2) {
			if(vec2 instanceof Vector2) {
				return ((this.x * vec2.x) + (this.y * vec2.y));
			} else {
				throw invalidParameter('vec2', vec2, 'Vector2', 'Vector2.dot');
			}
		},
		
		get length() {
			return Math.sqrt((this.x * this.x) + (this.y * this.y));
		},
		
		maximize: function(vec2) {
			if(vec2 instanceof Vector2) {
				this.x = Math.max(this.x, vec2.x);
				this.y = Math.max(this.y, vec2.y);
			} else {
				throw invalidParameter('vec2', vec2, 'Vector2', 'Vector2.max');
			}
			
			return this;
		},
		
		minimize: function(vec2) {
			if(vec2 instanceof Vector2) {
				this.x = Math.min(this.x, vec2.x);
				this.y = Math.min(this.y, vec2.y);
			} else {
				throw invalidParameter('vec2', vec2, 'Vector2', 'Vector2.min');
			}
			
			return this;
		},
		
		multiply: function(value) {
			if(value instanceof Vector2) {
				this.x *= value.x;
				this.y *= value.y;
			} else if(isNumber(value)) {
				this.x *= value;
				this.y *= value;
			} else {
				throw invalidParameter('value', value, 'number or Vector2', 'Vector2.multiply');
			}
			
			return this;
		},
		
		normalize: function() {
			var inverted = 1.0 / this.length;
			
			this.x *= inverted;
			this.y *= inverted;
			
			return this;
		},
		
		get normalized() {
			return this.copy.normalize();
		},
		
		rotate: function(radians) {
			if(isNumber(radians)) {
				var cosRad = Math.cos(radians),
					sinRad = Math.sin(radians),
					rotX = ((this.x * cosRad) - (this.y * sinRad)),
					rotY = ((this.x * sinRad) + (this.y * cosRad));
				
				this.x = rotX;
				this.y = rotY;
			} else {
				throw invalidParameter('radians', radians, 'number', 'Vector2.rotate');
			}
			
			return this;
		},
		
		subtract: function(value) {
			if(value instanceof Vector2) {
				this.x -= value.x;
				this.y -= value.y;
			} else if(isNumber(value)) {
				this.x -= value;
				this.y -= value;
			} else {
				throw invalidParameter('value', value, 'number or Vector2', 'Vector2.subtract');
			}
			
			return this;
		},
		
		swap: function(vec2) {
			if(vec2 instanceof Vector2) {
				this.x = vec2.x + (vec2.x = this.x, 0);
				this.y = vec2.y + (vec2.y = this.y, 0);
			} else {
				throw invalidParameter('vec2', vec2, 'Vector2', 'Vector2.swap');
			}
		},
		
		toString: function() {
			return '(' + this.x + ', ' + this.y + ')';
		}
	};
	
	function Vector3(xScalarOrVec3, y, z) {
		// Define read-only member array
		Object.defineProperty(this, 'array', {
			value: new Float32Array([ 0, 0, 0 ])
		});
		
		// Define members x, y and z
		[ 'x', 'y', 'z' ].forEach(function(property, index) {
			Object.defineProperty(this, property, {
				get: function() {
					return this.array[index];
				},
				set: function(value) {
					if(isNumber(value)) {
						this.array[index] = value;
					} else {
						throw invalidAssignment('Vector3.' + property, value, 'number');
					}
				}
			});
		}, this);
		
		// Call assign method if parameters are set
		if(definedNotNull(xScalarOrVec3)) {
			this.assign(xScalarOrVec3, y, z);
		}
	}
	
	Vector3.prototype = {
		add: function(value) {
			if(value instanceof Vector3) {
				this.x += value.x;
				this.y += value.y;
				this.z += value.z;
			} else if(isNumber(value)) {
				this.x += value;
				this.y += value;
				this.z += value;
			} else {
				throw invalidParameter('value', value, 'number or Vector3', 'Vector3.add');
			}
			
			return this;
		},
		
		angle: function(vec3) {
			if(vec3 instanceof Vector3) {
				return Math.acos(this.dot(vec3) / (this.length * vec3.length));
			} else {
				throw invalidParameter('vec3', vec3, 'Vector3', 'Vector3.angle');
			}
		},
		
		assign: function(xScalarOrVec3, y, z) {
			if(xScalarOrVec3 instanceof Vector3) {
				return this.assign(xScalarOrVec3.x, xScalarOrVec3.y, xScalarOrVec3.z);
			} else if(xScalarOrVec3 instanceof Vector2) {
				return this.assign(xScalarOrVec3.x, xScalarOrVec3.y, (isNumber(y) ? y : 0.0));
			} else if(isNumber(xScalarOrVec3) && !definedNotNull(y) && !definedNotNull(z)) {
				return this.assign(xScalarOrVec3, xScalarOrVec3, xScalarOrVec3);
			} else {
				var args = [ 'x', 'y', 'z' ], x = xScalarOrVec3;
				
				[ x, y, z ].forEach(function(arg, index) {
					if(!isNumber(arg)) {
						throw invalidParameter(args[index], arg, 'number', 'Vector3.assign');
					}
				});
				
				this.x = x;
				this.y = y;
				this.z = z;
			}
			
			return this;
		},
		
		get copy() {
			return new Vector3(this);
		},
		
		cross: function(vec3) {
			if(vec3 instanceof Vector3) {
				return new Vector3(
					(this.y * vec3.z) - (this.z * vec3.y),
					(this.z * vec3.x) - (this.x * vec3.z),
					(this.x * vec3.y) - (this.y * vec3.x)
				);
			} else {
				throw invalidParameter('vec3', vec3, 'Vector3', 'Vector3.cross');
			}
		},
		
		distance: function(vec3) {
			if(vec3 instanceof Vector3) {
				var dx = this.x - vec3.x, dy = this.y - vec2.y, dz = this.z - vec3.z;
				return Math.sqrt((dx * dx) + (dy * dy) + (dz * dz));
			} else {
				throw invalidParameter('vec3', vec3, 'Vector3', 'Vector3.distance');
			}
		},
		
		divide: function(value) {
			if(value instanceof Vector3) {
				this.x /= value.x;
				this.y /= value.y;
				this.z /= value.z;
			} else if(isNumber(value)) {
				this.x /= value;
				this.y /= value;
				this.z /= value;
			} else if(value instanceof Matrix33) {
				this.assign(
					(this.x / value.array[0]) + (this.y / value.array[3]) + (this.z / value.array[6]),
					(this.x / value.array[1]) + (this.y / value.array[4]) + (this.z / value.array[7]),
					(this.x / value.array[2]) + (this.y / value.array[5]) + (this.z / value.array[8])
				);
			} else if(value instanceof Matrix44) {
				this.assign(
					(this.x / value.array[0]) + (this.y / value.array[4]) + (this.z / value.array[ 8]) + value.array[12],
					(this.x / value.array[1]) + (this.y / value.array[5]) + (this.z / value.array[ 9]) + value.array[13],
					(this.x / value.array[2]) + (this.y / value.array[6]) + (this.z / value.array[10]) + value.array[14]
				);
			} else {
				throw invalidParameter('value', value, 'number, Vector3, Matrix33 or Matrix44', 'Vector3.divide');
			}
			
			return this;
		},
		
		dot: function(vec3) {
			if(vec3 instanceof Vector3) {
				return ((this.x * vec3.x) + (this.y * vec3.y) + (this.z * vec3.z));
			} else {
				throw invalidParameter('vec3', vec3, 'Vector3', 'Vector3.dot');
			}
		},
		
		get length() {
			return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
		},
		
		maximize: function(vec3) {
			if(vec3 instanceof Vector3) {
				this.x = Math.max(this.x, vec3.x);
				this.y = Math.max(this.y, vec3.y);
				this.z = Math.max(this.z, vec3.z);
			} else {
				throw invalidParameter('vec3', vec3, 'Vector3', 'Vector3.max');
			}
			
			return this;
		},
		
		minimize: function(vec3) {
			if(vec3 instanceof Vector2) {
				this.x = Math.min(this.x, vec3.x);
				this.y = Math.min(this.y, vec3.y);
				this.z = Math.min(this.z, vec3.z);
			} else {
				throw invalidParameter('vec3', vec3, 'Vector3', 'Vector3.min');
			}
			
			return this;
		},
		
		multiply: function(value) {
			if(value instanceof Vector3) {
				this.x *= value.x;
				this.y *= value.y;
				this.z *= value.z;
			} else if(isNumber(value)) {
				this.x *= value;
				this.y *= value;
				this.z *= value;
			} else if(value instanceof Matrix33) {
				this.assign(
					(this.x * value.array[0]) + (this.y * value.array[3]) + (this.z * value.array[6]),
					(this.x * value.array[1]) + (this.y * value.array[4]) + (this.z * value.array[7]),
					(this.x * value.array[2]) + (this.y * value.array[5]) + (this.z * value.array[9])
				);
			} else if(value instanceof Matrix44) {
				this.assign(
					(this.x * value.array[0]) + (this.y * value.array[4]) + (this.z * value.array[ 8]) + value.array[12],
					(this.x * value.array[1]) + (this.y * value.array[5]) + (this.z * value.array[ 9]) + value.array[13],
					(this.x * value.array[2]) + (this.y * value.array[6]) + (this.z * value.array[10]) + value.array[14]
				);
			} else {
				throw invalidParameter('value', value, 'number, Vector3, Matrix33 or Matrix44', 'Vector3.multiply');
			}
			
			return this;
		},
		
		normalize: function() {
			var inverted = 1.0 / this.length;
			
			this.x *= inverted;
			this.y *= inverted;
			this.z *= inverted;
			
			return this;
		},
		
		get normalized() {
			return this.copy.normalize();
		},
		
		rotateX: function(radians) {
			if(isNumber(radians)) {
				var cosRad = Math.cos(radians),
					sinRad = Math.sin(radians),
					rotY = ((this.y * cosRad) - (this.z * sinRad)),
					rotZ = ((this.y * sinRad) + (this.z * cosRad));
				
				this.y = rotY;
				this.z = rotZ;
			} else {
				throw invalidParameter('radians', radians, 'number', 'Vector3.rotateX');
			}
			
			return this;
		},
		
		rotateY: function(radians) {
			if(isNumber(radians)) {
				var cosRad = Math.cos(radians),
					sinRad = Math.sin(radians),
					rotX = ((this.x * cosRad) - (this.z * sinRad)),
					rotZ = ((this.x * sinRad) + (this.z * cosRad));
				
				this.x = rotX;
				this.z = rotZ;
			} else {
				throw invalidParameter('radians', radians, 'number', 'Vector3.rotateY');
			}
			
			return this;
		},
		
		rotateZ: function(radians) {
			if(isNumber(radians)) {
				var cosRad = Math.cos(radians),
					sinRad = Math.sin(radians),
					rotX = ((this.x * cosRad) - (this.y * sinRad)),
					rotY = ((this.x * sinRad) + (this.y * cosRad));
				
				this.x = rotX;
				this.y = rotY;
			} else {
				throw invalidParameter('radians', radians, 'number', 'Vector3.rotateZ');
			}
			
			return this;
		},
		
		subtract: function(value) {
			if(value instanceof Vector3) {
				this.x -= value.x;
				this.y -= value.y;
				this.z -= value.z;
			} else if(isNumber(value)) {
				this.x -= value;
				this.y -= value;
				this.z -= value;
			} else {
				throw invalidParameter('value', value, 'number or Vector3', 'Vector3.subtract');
			}
			
			return this;
		},
		
		swap: function(vec3) {
			if(vec3 instanceof Vector3) {
				this.x = vec3.x + (vec3.x = this.x, 0);
				this.y = vec3.y + (vec3.y = this.y, 0);
				this.z = vec3.z + (vec3.z = this.z, 0);
			} else {
				throw invalidParameter('vec3', vec3, 'Vector3', 'Vector3.swap');
			}
		},
		
		toString: function() {
			return '(' + this.x + ', ' + this.y + ', ' + this.z + ')';
		},
		
		get xy() {
			return new Vector2(this.x, this.y);
		},
		
		get xz() {
			return new Vector2(this.x, this.z);
		},
		
		get yz() {
			return new Vector2(this.y, this.z);
		}
	};
	
	function Vector4(xScalarOrVec, y, z, w) {
		// Define read-only member array
		Object.defineProperty(this, 'array', {
			value: new Float32Array([ 0, 0, 0, 0 ])
		});
		
		// Define members x, y, z and w
		[ 'x', 'y', 'z', 'w' ].forEach(function(property, index) {
			Object.defineProperty(this, property, {
				get: function() {
					return this.array[index];
				},
				set: function(value) {
					if(isNumber(value)) {
						this.array[index] = value;
					} else {
						throw invalidAssignment('Vector4.' + property, value, 'number');
					}
				}
			});
		}, this);
		
		// Call assign method if parameters are set
		if(definedNotNull(xScalarOrVec)) {
			this.assign(xScalarOrVec, y, z, w);
		}
	}
	
	Vector4.prototype = {
		add: function(value) {
			if(value instanceof Vector4) {
				this.x += value.x;
				this.y += value.y;
				this.z += value.z;
				this.w += value.w;
			} else if(isNumber(value)) {
				this.x += value;
				this.y += value;
				this.z += value;
				this.w += value;
			} else {
				throw invalidParameter('value', value, 'number or Vector4', 'Vector4.add');
			}
			
			return this;
		},
		
		assign: function(xScalarOrVec, y, z, w) {
			if(xScalarOrVec instanceof Vector4) {
				return this.assign(xScalarOrVec.x, xScalarOrVec.y, xScalarOrVec.z, xScalarOrVec.w);
			} else if(xScalarOrVec instanceof Vector3) {
				return this.assign(xScalarOrVec.x, xScalarOrVec.y, xScalarOrVec.z, (isNumber(y) ? y : 1.0));
			} else if(xScalarOrVec instanceof Vector2) {
				return this.assign(xScalarOrVec.x, xScalarOrVec.y, (isNumber(y) ? y : 0.0), (isNumber(z) ? z : 1.0));
			} else if(isNumber(xScalarOrVec) && !definedNotNull(y) && !definedNotNull(z) && !definedNotNull(w)) {
				return this.assign(xScalarOrVec, xScalarOrVec, xScalarOrVec, xScalarOrVec);
			} else {
				var args = [ 'x', 'y', 'z', 'w' ], x = xScalarOrVec;
				
				[ x, y, z, w ].forEach(function(arg, index) {
					if(!isNumber(arg)) {
						throw invalidParameter(args[index], arg, 'number', 'Vector4.assign');
					}
				});
				
				this.x = x;
				this.y = y;
				this.z = z;
				this.w = w;
			}
			
			return this;
		},
		
		get copy() {
			return new Vector4(this);
		},
		
		divide: function(value) {
			if(value instanceof Vector4) {
				this.x /= value.x;
				this.y /= value.y;
				this.z /= value.z;
				this.w /= value.w;
			} else if(isNumber(value)) {
				this.x /= value;
				this.y /= value;
				this.z /= value;
				this.w /= value;
			} else if(value instanceof Matrix44) {
				this.assign(
					(this.x / value.array[0]) + (this.y / value.array[4]) + (this.z / value.array[ 8]) + (this.w / value.array[12]),
					(this.x / value.array[1]) + (this.y / value.array[5]) + (this.z / value.array[ 9]) + (this.w / value.array[13]),
					(this.x / value.array[2]) + (this.y / value.array[6]) + (this.z / value.array[10]) + (this.w / value.array[14]),
					(this.x / value.array[3]) + (this.y / value.array[7]) + (this.z / value.array[11]) + (this.w / value.array[15])
				);
			} else {
				throw invalidParameter('value', value, 'number, Vector4 or Matrix44', 'Vector4.divide');
			}
			
			return this;
		},
		
		dot: function(vec4) {
			if(vec4 instanceof Vector4) {
				return ((this.x * vec4.x) + (this.y * vec4.y) + (this.z * vec4.z) + (this.w * vec4.w));
			} else {
				throw invalidParameter('vec4', vec4, 'Vector4', 'Vector4.dot');
			}
		},
		
		get length() {
			return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w));
		},
		
		maximize: function(vec4) {
			if(vec4 instanceof Vector4) {
				this.x = Math.max(this.x, vec4.x);
				this.y = Math.max(this.y, vec4.y);
				this.z = Math.max(this.z, vec4.z);
				this.w = Math.max(this.w, vec4.w);
			} else {
				throw invalidParameter('vec4', vec4, 'Vector4', 'Vector4.minimize');
			}
			
			return this;
		},
		
		minimize: function(vec4) {
			if(vec4 instanceof Vector4) {
				this.x = Math.min(this.x, vec4.x);
				this.y = Math.min(this.y, vec4.y);
				this.z = Math.min(this.z, vec4.z);
				this.w = Math.min(this.w, vec4.w);
			} else {
				throw invalidParameter('vec4', vec4, 'Vector4', 'Vector4.minimize');
			}
			
			return this;
		},
		
		multiply: function(value) {
			if(value instanceof Vector4) {
				this.x *= value.x;
				this.y *= value.y;
				this.z *= value.z;
				this.w *= value.w;
			} else if(isNumber(value)) {
				this.x *= value;
				this.y *= value;
				this.z *= value;
				this.w *= value;
			} else if(value instanceof Matrix44) {
				this.assign(
					(this.x * value.array[0]) + (this.y * value.array[4]) + (this.z * value.array[ 8]) + (this.w * value.array[12]),
					(this.x * value.array[1]) + (this.y * value.array[5]) + (this.z * value.array[ 9]) + (this.w * value.array[13]),
					(this.x * value.array[2]) + (this.y * value.array[6]) + (this.z * value.array[10]) + (this.w * value.array[14]),
					(this.x * value.array[3]) + (this.y * value.array[7]) + (this.z * value.array[11]) + (this.w * value.array[15])
				);
			} else {
				throw invalidParameter('value', value, 'number, Vector4 or Matrix44', 'Vector4.multiply');
			}
			
			return this;
		},
		
		normalize: function() {
			var inverted = 1.0 / this.length;
			
			this.x *= inverted;
			this.y *= inverted;
			this.z *= inverted;
			this.w *= inverted;
			
			return this;
		},
		
		get normalized() {
			return this.copy.normalize();
		},
		
		subtract: function(value) {
			if(value instanceof Vector4) {
				this.x -= value.x;
				this.y -= value.y;
				this.z -= value.z;
				this.w -= value.w;
			} else if(isNumber(value)) {
				this.x -= value;
				this.y -= value;
				this.z -= value;
				this.w -= value;
			} else {
				throw invalidParameter('value', value, 'number or Vector4', 'Vector4.subtract');
			}
			
			return this;
		},
		
		swap: function(vec4) {
			if(vec4 instanceof Vector4) {
				this.x = vec4.x + (vec4.x = this.x, 0);
				this.y = vec4.y + (vec4.y = this.y, 0);
				this.z = vec4.z + (vec4.z = this.z, 0);
				this.w = vec4.w + (vec4.w = this.w, 0);
			} else {
				throw invalidParameter('vec4', vec4, 'Vector4', 'Vector4.swap');
			}
		},
		
		toString: function() {
			return ('(' + this.x + ', ' + this.y + ', ' + this.z + ', ' + this.w + ')');
		},
		
		get xy() {
			return new Vector2(this.x, this.y);
		},
		
		get xyz() {
			return new Vector3(this.x, this.y, this.z);
		},
		
		get xyw() {
			return new Vector3(this.x, this.y, this.w);
		},
		
		get xz() {
			return new Vector2(this.x, this.z);
		},
		
		get xzw() {
			return new Vector3(this.x, this.z, this.w);
		},
		
		get xw() {
			return new Vector2(this.x, this.w);
		},
		
		get yz() {
			return new Vector2(this.y, this.z);
		},
		
		get yzw() {
			return new Vector3(this.y, this.z, this.w);
		},
		
		get yw() {
			return new Vector2(this.y, this.w);
		},
		
		get zw() {
			return new Vector2(this.z, this.w);
		}
	};
	
	function Matrix33(value) {
		// Define read-only member array
		Object.defineProperty(this, 'array', {
			value: new Float32Array([ 1, 0, 0, 0, 1, 0, 0, 0, 1 ])
		});
		
		// Call assign method if parameter is set
		if(definedNotNull(value)) {
			this.assign(value);
		}
	}
	
	Matrix33.prototype = {
		assign: function(value) {
			var row, col, e;
			
			if(value instanceof Matrix33) {
				for(e in value.array) {
					this.array[e] = value.array[e];
				}
			} else if(value instanceof Matrix44) {
				for(col = 0; col < 3; ++col) {
					for(row = 0; row < 3; ++row) {
						this.array[(col * 3) + row] = value.array[(col * 4) + row];
					}
				}
			} else if(isArray(value) && value.length == 9) {
				for(e in value) {
					this.array[e] = value[e];
				}
			} else if(isNumber(value)) {
				for(e in this.array) {
					this.array[e] = value;
				}
			} else {
				throw invalidParameter('value', value, 'number, Matrix33, Matrix44 or array[9]', 'Matrix33.assign');
			}
			
			return this;
		},
		
		assignIdentity: function() {
			for(var i = 0; i < 9; ++i) {
				this.array[i] = (i % 4 ? 0.0 : 1.0);
			}
		},
		
		get copy() {
			return new Matrix33(this);
		},
		
		get determinant() {
			return (this.array[0] * (this.array[4] * this.array[8] - this.array[5] * this.array[7]) -
					this.array[1] * (this.array[3] * this.array[8] - this.array[5] * this.array[6]) +
					this.array[2] * (this.array[3] * this.array[7] - this.array[4] * this.array[6]));
		},
		
		element: function(colOrIndex, row) {
			if(isNumber(row) && isNumber(colOrIndex)) {
				if(row >= 0 && row <= 3 && colOrIndex >= 0 && colOrIndex <= 3) {
					return this.array[(colOrIndex * 3) + row];
				}
			} else if(isNumber(colOrIndex) && colOrIndex < 9) {
				return this.array[colOrIndex];
			}
			
			throw indexOutOfRange('Matrix33.element', (Number(colOrIndex) + Number(row)), '0-9');
		},
		
		get inverse() {
			var temp = this.copy;
			
			if(!temp.invert()) {
				console.warn('Inverse Matrix33 does not exist: ' + temp.toString());
				return undefined;
			}
			
			return temp;
		},
		
		invert: function() {
			var temp = new Float32Array([
				this.array[4] * this.array[8] - this.array[5] * this.array[7],
				this.array[2] * this.array[7] - this.array[1] * this.array[8],
				this.array[1] * this.array[5] - this.array[2] * this.array[4],
				this.array[5] * this.array[6] - this.array[3] * this.array[8],
				this.array[0] * this.array[8] - this.array[2] * this.array[6],
				this.array[2] * this.array[3] - this.array[0] * this.array[5],
				this.array[3] * this.array[7] - this.array[4] * this.array[6],
				this.array[1] * this.array[6] - this.array[0] * this.array[7],
				this.array[0] * this.array[4] - this.array[1] * this.array[3]
			]);
			
			var det = (this.array[0] * temp[0] + this.array[1] * temp[3] + this.array[2] * temp[6]), e;
			
			if(Math.abs(det) < 10e-5) {
				return false;
			}
			
			det = 1.0 / det;
			
			for(e in temp) {
				this.array[e] = (temp[e] * det);
			}
			
			return true;
		},
		
		multiply: function(value) {
			var col, row, e, temp;
			
			if(value instanceof Matrix33) {
				temp = new Float32Array(this.array);
				
				for(col = 0; col < 3; ++col) {
					for(row = 0; row < 3; ++row) {
						this.array[(col * 3) + row] = ((temp[(col * 3) + 0] * value.array[(0 * 3) + row]) +
													   (temp[(col * 3) + 1] * value.array[(1 * 3) + row]) +
													   (temp[(col * 3) + 2] * value.array[(2 * 3) + row]));
					}
				}
			} else if(value instanceof Matrix44) {
				return this.multiply(new Matrix33(value));
			} else if(isNumber(value)) {
				for(e in this.array) {
					this.array[e] *= value;
				}
			} else {
				throw invalidParameter('value', value, 'number, Matrix33 or Matrix44', 'Matrix33.multiply');
			}
			
			return this;
		},
		
		toString: function() {
			return ('[[' + this.array[0].toPrecision(5) + ', ' + this.array[1].toPrecision(5) + ', ' + this.array[2].toPrecision(5) + '], ' +
					 '[' + this.array[3].toPrecision(5) + ', ' + this.array[4].toPrecision(5) + ', ' + this.array[5].toPrecision(5) + '], ' +
					 '[' + this.array[6].toPrecision(5) + ', ' + this.array[7].toPrecision(5) + ', ' + this.array[8].toPrecision(5) + ']]');
		},
		
		transpose: function() {
			var temp;
			
			temp = this.array[1];
			this.array[1] = this.array[3];
			this.array[3] = temp;
			
			temp = this.array[2];
			this.array[2] = this.array[6];
			this.array[6] = temp;
			
			temp = this.array[5];
			this.array[5] = this.array[7];
			this.array[7] = temp;
			
			return this;
		},
		
		get transposed() {
			return this.copy.transpose();
		}
	};
	
	function Matrix44(value) {
		// Define read-only member array
		Object.defineProperty(this, 'array', {
			value: new Float32Array([ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ])
		});
		
		// Call assign method if parameter is set
		if(definedNotNull(value)) {
			this.assign(value);
		}
	}
	
	Matrix44.prototype = {
		assign: function(value) {
			var row, col, e;
			
			if(value instanceof Matrix33) {
				for(col = 0; col < 3; ++col) {
					for(row = 0; row < 3; ++row) {
						this.array[(col * 4) + row] = value.array[(col * 3) + row];
					}
				}
				
				this.array[ 3] = this.array[ 7] = this.array[11] = 0.0;
				this.array[12] = this.array[13] = this.array[14] = 0.0;
				this.array[16] = 1.0;
			} else if(value instanceof Matrix44) {
				for(e in value.array) {
					this.array[e] = value.array[e];
				}
			} else if(isArray(value) && value.length == 16) {
				for(e in value) {
					this.array[e] = value[e];
				}
			} else if(isNumber(value)) {
				for(e in this.array) {
					this.array[e] = value;
				}
			} else {
				throw invalidParameter('value', value, 'number, Matrix33, Matrix44 or array[16]', 'Matrix44.assign');
			}
			
			return this;
		},
		
		assignIdentity: function() {
			for(var i = 0; i < 16; ++i) {
				this.array[i] = (i % 5 ? 0.0 : 1.0);
			}
		},
		
		get copy() {
			return new Matrix44(this);
		},
		
		get determinant() {
			var a0 = this.array[ 0] * this.array[ 5] - this.array[ 1] * this.array[ 4],
				a1 = this.array[ 0] * this.array[ 6] - this.array[ 2] * this.array[ 4],
				a2 = this.array[ 0] * this.array[ 7] - this.array[ 3] * this.array[ 4],
				a3 = this.array[ 1] * this.array[ 6] - this.array[ 2] * this.array[ 5],
				a4 = this.array[ 1] * this.array[ 7] - this.array[ 3] * this.array[ 5],
				a5 = this.array[ 2] * this.array[ 7] - this.array[ 3] * this.array[ 6],
				b0 = this.array[ 8] * this.array[13] - this.array[ 9] * this.array[12],
				b1 = this.array[ 8] * this.array[14] - this.array[10] * this.array[12],
				b2 = this.array[ 8] * this.array[15] - this.array[11] * this.array[12],
				b3 = this.array[ 9] * this.array[14] - this.array[10] * this.array[13],
				b4 = this.array[ 9] * this.array[15] - this.array[11] * this.array[13],
				b5 = this.array[10] * this.array[15] - this.array[11] * this.array[14];
			
			return (a0 * b5 - a1 * b4 + a2 * b3 + a3 * b2 - a4 * b1 + a5 * b0);
		},
		
		element: function(colOrIndex, row) {
			if(isNumber(row) && isNumber(colOrIndex)) {
				if(row >= 0 && row <= 4 && colOrIndex >= 0 && colOrIndex <= 4) {
					return this.array[(colOrIndex * 4) + row];
				}
			} else if(isNumber(colOrIndex) && colOrIndex < 16) {
				return this.array[colOrIndex];
			}
			
			throw indexOutOfRange('Matrix44.element', (Number(colOrIndex) + Number(row)), '0-16');
		},
		
		frustum: function(left, right, bottom, top, near, far) {
			var args = 'left,right,bottom,top,near,far'.split(','), dX, dY, dZ;
			
			[ left, right, bottom, top, near, far ].forEach(function(arg, index) {
				if(!isNumber(arg)) {
					throw invalidParameter(args[index], arg, 'number', 'Matrix44.frustum');
				}
			});
			
			// Ensure valid range for all arguments
			if(near <= 0.0 || far <= 0.0 || (dX = right - left) <= 0.0 || (dY = top - bottom) <= 0.0 || (dZ = far - near) <= 0.0) {
				return false;
			}
			
			this.assign(new Matrix44([
				2.0 * near / dX, 0.0, 0.0, 0.0,
				0.0, 2.0 * near / dY, 0.0, 0.0,
				(right + left) / dX, (top + bottom) / dY, -(near + far) / dZ, -1.0,
				0.0, 0.0, -2.0 * near * far / dZ, 0.0
			]).multiply(this));
			
			return true;
		},
		
		get inverse() {
			var temp = this.copy;
			
			if(!temp.invert()) {
				console.warn('Inverse Matrix44 does not exist: ' + temp.toString());
				return undefined;
			}
			
			return temp;
		},
		
		invert: function() {
			var a0 = this.array[ 0] * this.array[ 5] - this.array[ 1] * this.array[ 4],
				a1 = this.array[ 0] * this.array[ 6] - this.array[ 2] * this.array[ 4],
				a2 = this.array[ 0] * this.array[ 7] - this.array[ 3] * this.array[ 4],
				a3 = this.array[ 1] * this.array[ 6] - this.array[ 2] * this.array[ 5],
				a4 = this.array[ 1] * this.array[ 7] - this.array[ 3] * this.array[ 5],
				a5 = this.array[ 2] * this.array[ 7] - this.array[ 3] * this.array[ 6],
				b0 = this.array[ 8] * this.array[13] - this.array[ 9] * this.array[12],
				b1 = this.array[ 8] * this.array[14] - this.array[10] * this.array[12],
				b2 = this.array[ 8] * this.array[15] - this.array[11] * this.array[12],
				b3 = this.array[ 9] * this.array[14] - this.array[10] * this.array[13],
				b4 = this.array[ 9] * this.array[15] - this.array[11] * this.array[13],
				b5 = this.array[10] * this.array[15] - this.array[11] * this.array[14],
				det = (a0 * b5 - a1 * b4 + a2 * b3 + a3 * b2 - a4 * b1 + a5 * b0), temp, e;
			
			if(Math.abs(det) < 10e-5) {
				return false;
			}
			
			temp = new Float32Array([
				 this.array[ 5] * b5 - this.array[ 6] * b4 + this.array[ 7] * b3,
				-this.array[ 1] * b5 + this.array[ 2] * b4 - this.array[ 3] * b3,
				 this.array[13] * a5 - this.array[14] * a4 + this.array[15] * a3,
				-this.array[ 9] * a5 + this.array[10] * a4 - this.array[11] * a3,
				-this.array[ 4] * b5 + this.array[ 6] * b2 - this.array[ 7] * b1,
				 this.array[ 0] * b5 - this.array[ 2] * b2 + this.array[ 3] * b1,
				-this.array[12] * a5 + this.array[14] * a2 - this.array[15] * a1,
				 this.array[ 8] * a5 - this.array[10] * a2 + this.array[11] * a1,
				 this.array[ 4] * b4 - this.array[ 5] * b2 + this.array[ 7] * b0,
				-this.array[ 0] * b4 + this.array[ 1] * b2 - this.array[ 3] * b0,
				 this.array[12] * a4 - this.array[13] * a2 + this.array[15] * a0,
				-this.array[ 8] * a4 + this.array[ 9] * a2 - this.array[11] * a0,
				-this.array[ 4] * b3 + this.array[ 5] * b1 - this.array[ 6] * b0,
				 this.array[ 0] * b3 - this.array[ 1] * b1 + this.array[ 2] * b0,
				-this.array[12] * a3 + this.array[13] * a1 - this.array[14] * a0,
				 this.array[ 8] * a3 - this.array[ 9] * a1 + this.array[10] * a0 
			]);
			
			det = 1.0 / det;
			
			for(e in temp) {
				this.array[e] = (temp[e] * det);
			}
			
			return true;
		},
		
		multiply: function(value) {
			var col, row, e, temp;
			
			if(value instanceof Matrix44) {
				temp = new Float32Array(this.array);
				
				for(col = 0; col < 4; ++col) {
					for(row = 0; row < 4; ++row) {
						this.array[(col * 4) + row] = ((temp[(col * 4) + 0] * value.array[(0 * 4) + row]) +
													   (temp[(col * 4) + 1] * value.array[(1 * 4) + row]) +
													   (temp[(col * 4) + 2] * value.array[(2 * 4) + row]) +
													   (temp[(col * 4) + 3] * value.array[(3 * 4) + row]));
					}
				}
			} else if(value instanceof Matrix33) {
				return this.multiply(new Matrix44(value));
			} else if(isNumber(value)) {
				for(e in this.array) {
					this.array[e] *= value;
				}
			} else {
				throw invalidParameter('value', value, 'number, Matrix33 or Matrix44', 'Matrix44.multiply');
			}
			
			return this;
		},
		
		ortho: function(left, right, bottom, top, near, far) {
			var args = 'left,right,bottom,top,near,far'.split(',');
			
			[ left, right, bottom, top, near, far ].forEach(function(arg, index) {
				if(!isNumber(arg)) {
					throw invalidParameter(args[index], arg, 'number', 'Matrix44.ortho');
				}
			});
			
			// Ensure valid range for all arguments
			if(!(dX = right - left) || !(dY = top - bottom) || !(dZ = far - near)) {
				return false;
			}
			
			this.assign(new Matrix44([
				2.0 / dX, 0.0, 0.0, 0.0,
				0.0, 2.0 / dY, 0.0, 0.0,
				0.0, 0.0, -2.0 / dZ, 0.0,
				-(right + left) / dX, -(top + bottom) / dY, -(near + far) / dZ, 1.0
			]).multiply(this));
			
			return true;
		},
		
		perspective: function(verticalViewAngle, aspectRatio, near, far) {
			var args = 'verticalViewAngle,aspectRatio,near,far'.split(','), height, width, temp = new Matrix44();
			
			[ verticalViewAngle, aspectRatio, near, far ].forEach(function(arg, index) {
				if(!isNumber(arg)) {
					throw invalidParameter(args[index], arg, 'number', 'Matrix44.perspective');
				}
			});
			
			if(near <= 0.0 || far <= 0.0) {
				return false;
			}
			
			height = Math.tan((verticalViewAngle / 360.0) * Math.PI) * near;
			width = height * aspectRatio;
			
			if(temp.frustum(-width, width, -height, height, near, far)) {
				this.assign(temp.multiply(this));
				return true;
			}
			
			return false;
		},
		
		rotate: function(radians, xOrVec3, y, z) {
			if(!isNumber(radians)) {
				throw invalidParameter('radians', radians, 'number', 'Matrix44.rotate');
			} else if(xOrVec3 instanceof Vector3) {
				return this.rotate(radians, xOrVec3.x, xOrVec3.y, xOrVec3.z);
			} else {
				var args = [ 'x', 'y', 'z' ], x = xOrVec3, cosRad, sinRad, mag, oneMinusCos;
				
				[ x, y, z ].forEach(function(arg, index) {
					if(typeof arg != 'number') {
						throw invalidParameter(args[index], arg, 'number', 'Matrix44.rotate');
					}
				});
				
				oneMinusCos = 1.0 - (cosRad = Math.cos(radians));
				sinRad = Math.sin(radians);
				
				if(!isNaN((mag = Math.sqrt(x * x + y * y + z * z)))) {
					x /= mag;
					y /= mag;
					z /= mag;
					
					this.assign(new Matrix44([
						(oneMinusCos * (x * x)) + cosRad, (oneMinusCos * (x * y)) - (z * sinRad), (oneMinusCos * (x * z)) + (y * sinRad), 0.0,	// X rotation
						(oneMinusCos * (y * x)) + (z * sinRad), (oneMinusCos * (y * y)) + cosRad, (oneMinusCos * (y * z)) - (x * sinRad), 0.0,	// Y rotation
						(oneMinusCos * (z * x)) - (y * sinRad), (oneMinusCos * (z * y)) + (x * sinRad), (oneMinusCos * (z * z)) + cosRad, 0.0,	// Z rotation
						0.0, 0.0, 0.0, 1.0
					]).multiply(this));
				}
			}
			
			return this;
		},
		
		scale: function(xOrVec3, y, z) {
			if(xOrVec3 instanceof Vector3) {
				return this.scale(xOrVec3.x, xOrVec3.y, xOrVec3.z);
			} else {
				var args = [ 'x', 'y', 'z' ], x = xOrVec3;
				
				[ x, y, z ].forEach(function(arg, index) {
					if(typeof arg != 'number') {
						throw invalidParameter(args[index], arg, 'number', 'Matrix44.scale');
					}
				});
				
				this.array[ 0] *= x; this.array[ 4] *= y; this.array[ 8] *= z;
				this.array[ 1] *= x; this.array[ 5] *= y; this.array[ 9] *= z;
				this.array[ 2] *= x; this.array[ 6] *= y; this.array[10] *= z;
				this.array[ 3] *= x; this.array[ 7] *= y; this.array[11] *= z;
			}
			
			return this;
		},
		
		toString: function() {
			return ('[[' + this.array[ 0].toPrecision(5) + ', ' + this.array[ 1].toPrecision(5) + ', ' + this.array[ 2].toPrecision(5) + ', ' + this.array[ 3].toPrecision(5) + '], ' +
					 '[' + this.array[ 4].toPrecision(5) + ', ' + this.array[ 5].toPrecision(5) + ', ' + this.array[ 6].toPrecision(5) + ', ' + this.array[ 7].toPrecision(5) + '], ' +
					 '[' + this.array[ 8].toPrecision(5) + ', ' + this.array[ 9].toPrecision(5) + ', ' + this.array[10].toPrecision(5) + ', ' + this.array[11].toPrecision(5) + '], ' +
					 '[' + this.array[12].toPrecision(5) + ', ' + this.array[13].toPrecision(5) + ', ' + this.array[14].toPrecision(5) + ', ' + this.array[15].toPrecision(5) + ']]');
		},
		
		translate: function(xOrVec3, y, z) {
			if(xOrVec3 instanceof Vector3) {
				return this.translate(xOrVec3.x, xOrVec3.y, xOrVec3.z);
			} else {
				var args = [ 'x', 'y', 'z' ], x = xOrVec3;
				
				[ x, y, z ].forEach(function(arg, index) {
					if(typeof arg != 'number') {
						throw invalidParameter(args[index], arg, 'number', 'Matrix44.translate');
					}
				});
				
				this.array[12] += (this.array[ 0] * x + this.array[ 4] * y + this.array[ 8] * z);
				this.array[13] += (this.array[ 1] * x + this.array[ 5] * y + this.array[ 9] * z);
				this.array[14] += (this.array[ 2] * x + this.array[ 6] * y + this.array[10] * z);
				this.array[15] += (this.array[ 3] * x + this.array[ 7] * y + this.array[11] * z);
			}
			
			return this;
		},
		
		get translation() {
			return new Vector3(this.array[12], this.array[13], this.array[14]);
		},
		
		transpose: function() {
			var temp;
			
			temp = this.array[1];
			this.array[1] = this.array[4];
			this.array[4] = temp;
			
			temp = this.array[2];
			this.array[2] = this.array[8];
			this.array[8] = temp;
			
			temp = this.array[3];
			this.array[3] = this.array[12];
			this.array[12] = temp;
			
			temp = this.array[6];
			this.array[6] = this.array[9];
			this.array[9] = temp;
			
			temp = this.array[7];
			this.array[7] = this.array[13];
			this.array[13] = temp;
			
			temp = this.array[11];
			this.array[11] = this.array[14];
			this.array[14] = temp;
			
			return this;
		},
		
		get transposed() {
			return this.copy.transpose();
		}
	};
	
	linal.Vec2 = Vector2;
	linal.Vec3 = Vector3;
	linal.Vec4 = Vector4;
	linal.Mat33 = Matrix33;
	linal.Mat44 = Matrix44;
	
})();

if(typeof module == 'object') {
	module.exports = linal;
}
