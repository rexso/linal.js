var assert = require('assert');
var linal = require('./linal.min.js');

assert.floatEqual = function(a, b) {
	assert(typeof a === 'number' && typeof b === 'number' && a.toFixed(5) === b.toFixed(5), a + " ≈ " + b);
};

describe('Vector2', function() {
	it('class in linal', function() {
		assert.equal('function', typeof linal.Vec2);
		assert.equal(true, new linal.Vec2 instanceof linal.Vec2);
	});
	
	describe('methods', function() {
		describe('(constructor)', function() {
			it('(default)', function() {
				var a = new linal.Vec2();
				assert.floatEqual(a.x, 0);
				assert.floatEqual(a.y, 0);
			});
			
			it('scalar', function() {
				var a = new linal.Vec2(1);
				assert.floatEqual(1, a.x);
				assert.floatEqual(1, a.y);
			});
			
			it('vec2', function() {
				var a = new linal.Vec2(1, 2);
				var b = new linal.Vec2(a);
				assert.floatEqual(a.x, b.x);
				assert.floatEqual(a.y, b.y);
			});
			
			it('x, y', function() {
				var a = new linal.Vec2(1, 2);
				assert.floatEqual(1, a.x);
				assert.floatEqual(2, a.y);
			});
		});
		
		describe('add', function() {
			it('scalar', function() {
				var a = new linal.Vec2(1, 2);
				var b = new linal.Vec2(a).add(2);
				assert.floatEqual(a.x + 2, b.x);
				assert.floatEqual(a.y + 2, b.y);
			});
			
			it('vec2', function() {
				var a = new linal.Vec2(1, 2);
				var b = new linal.Vec2(2, 3);
				var c = new linal.Vec2(a).add(b);
				assert.floatEqual(a.x + b.x, c.x);
				assert.floatEqual(a.y + b.y, c.y);
			});
		});
		
		describe('assign', function() {
			it('scalar', function() {
				var a = new linal.Vec2().assign(1);
				assert.floatEqual(1, a.x);
				assert.floatEqual(1, a.y);
			});
			
			it('vec2', function() {
				var a = new linal.Vec2(1, 2);
				var b = new linal.Vec2().assign(a);
				assert.floatEqual(a.x, b.x);
				assert.floatEqual(a.y, b.y);
			});
			
			it('x, y', function() {
				var a = new linal.Vec2().assign(1, 2);
				assert.floatEqual(1, a.x);
				assert.floatEqual(2, a.y);
			});
		});
		
		describe('distance', function() {
			it('vec2', function() {
				var a = new linal.Vec2(1, 1)
				var b = new linal.Vec2(2, 2);
				var distance = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
				assert.floatEqual(distance, a.distance(b));
			});
		});
		
		describe('divide', function() {
			it('scalar', function() {
				var a = new linal.Vec2(2, 4);
				var b = new linal.Vec2(a).divide(2);
				assert.floatEqual(a.x / 2, b.x);
				assert.floatEqual(a.y / 2, b.y);
			});
			
			it('vec2', function() {
				var a = new linal.Vec2(2, 4);
				var b = new linal.Vec2(4, 8);
				var c = new linal.Vec2(a).divide(b);
				assert.floatEqual(a.x / b.x, c.x);
				assert.floatEqual(a.y / b.y, c.y);
			});
		});
		
		describe('dot', function() {
			it('vec2', function() {
				var a = new linal.Vec2(2, 2);
				var b = new linal.Vec2(4, 4);
				var dot = (a.x * b.x) + (a.y * b.y);
				assert.floatEqual(dot, a.dot(b));
			});
		});
		
		describe('maximize', function() {
			it('vec2', function() {
				var a = new linal.Vec2(1, 2);
				a.maximize(new linal.Vec2(2, 1));
				assert.floatEqual(2, a.x);
				assert.floatEqual(2, a.y);
			});
		});
		
		describe('minimize', function() {
			it('vec2', function() {
				var a = new linal.Vec2(1, 2);
				a.minimize(new linal.Vec2(2, 1));
				assert.floatEqual(1, a.x);
				assert.floatEqual(1, a.y);
			});
		});
		
		describe('multiply', function() {
			it('scalar', function() {
				var a = new linal.Vec2(2, 4);
				var b = new linal.Vec2(a).multiply(2);
				assert.floatEqual(a.x * 2, b.x);
				assert.floatEqual(a.y * 2, b.y);
			});
			
			it('vec2', function() {
				var a = new linal.Vec2(2, 4);
				var b = new linal.Vec2(4, 8);
				var c = new linal.Vec2(a).multiply(b);
				assert.floatEqual(a.x * b.x, c.x);
				assert.floatEqual(a.y * b.y, c.y);
			});
		});
		
		describe('normalize', function() {
			it('', function() {
				var a = new linal.Vec2(1, 2).normalize();
				assert.floatEqual(1.0, a.length);
			});
		});
		
		describe('rotate', function() {
			it('radians', function() {
				var a = new linal.Vec2(0.5, 1.0);
				var rotated = a.copy.rotate(Math.PI);
				assert.floatEqual((a.x * Math.cos(Math.PI)) - (a.y * Math.sin(Math.PI)), rotated.x);
				assert.floatEqual((a.x * Math.sin(Math.PI)) + (a.y * Math.cos(Math.PI)), rotated.y);
			});
		});
		
		describe('subtract', function() {
			it('scalar', function() {
				var a = new linal.Vec2(1, 2);
				var b = new linal.Vec2(a).subtract(2);
				assert.floatEqual(a.x - 2, b.x);
				assert.floatEqual(a.y - 2, b.y);
			});
			
			it('vec2', function() {
				var a = new linal.Vec2(1, 2);
				var b = new linal.Vec2(2, 3);
				var c = new linal.Vec2(a).subtract(b);
				assert.floatEqual(a.x - b.x, c.x);
				assert.floatEqual(a.y - b.y, c.y);
			});
		});
		
		describe('swap', function() {
			it('vec2', function() {
				var a = new linal.Vec2(1, 2), ac = a.copy, aa = a;
				var b = new linal.Vec2(2, 1), bc = b.copy, bb = b;
				aa.swap(bb);
				assert.strictEqual(a, aa);
				assert.strictEqual(b, bb);
				assert.floatEqual(ac.x, b.x);
				assert.floatEqual(ac.y, b.y);
				assert.floatEqual(bc.x, a.x);
				assert.floatEqual(bc.y, a.y);
			});
		});
		
		describe('toString', function() {
			it('', function() {
				var a = new linal.Vec2(1, 2);
				assert.equal('(1, 2)', a.toString());
			});
		});
	});
	
	describe('properties', function() {
		it('array', function() {
			var a = new linal.Vec2(1, 2);
			var array = new Float32Array([1, 2]);
			assert.floatEqual(array[0], a.array[0]);
			assert.floatEqual(array[1], a.array[1]);
		});
		
		it('copy', function() {
			var a = new linal.Vec2(1, 2);
			var copy = a.copy;
			assert.notStrictEqual(a, copy);
			assert.floatEqual(a.x, copy.x);
			assert.floatEqual(a.y, copy.y);
		});
		
		it('length', function() {
			var a = new linal.Vec2(1, 2);
			var length = Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
			assert.floatEqual(length, a.length);
		});
		
		it('normalized', function() {
			var a = new linal.Vec2(1, 2);
			var b = a.copy.normalize();
			var normalized = a.normalized;
			assert.floatEqual(b.x, normalized.x);
			assert.floatEqual(b.y, normalized.y);
			assert.floatEqual(b.length, normalized.length);
		});
		
		it('x', function() {
			var a = new linal.Vec2(1, 2);
			assert.floatEqual(1, a.x);
			assert.floatEqual(a.array[0], a.x);
		});
		
		it('y', function() {
			var a = new linal.Vec2(1, 2);
			assert.floatEqual(2, a.y);
			assert.floatEqual(a.array[1], a.y);
		});
	});
});

describe('Vector3', function() {
	it('class in linal', function() {
		assert.equal('function', typeof linal.Vec3);
		assert.equal(true, new linal.Vec3 instanceof linal.Vec3);
	});
	
	describe('methods', function() {
		describe('(constructor)', function() {
			it('(default)', function() {
				var a = new linal.Vec3();
				assert.floatEqual(a.x, 0);
				assert.floatEqual(a.y, 0);
				assert.floatEqual(a.z, 0);
			});
			
			it('scalar', function() {
				var a = new linal.Vec3(1);
				assert.floatEqual(1, a.x);
				assert.floatEqual(1, a.y);
				assert.floatEqual(1, a.z);
			});
			
			it('vec2', function() {
				var a = new linal.Vec2(1, 2);
				var b = new linal.Vec3(a);
				assert.floatEqual(a.x, b.x);
				assert.floatEqual(a.y, b.y);
				assert.floatEqual(0, b.z);
			});
			
			it('vec2, z', function() {
				var a = new linal.Vec2(1, 2);
				var b = new linal.Vec3(a, 3);
				assert.floatEqual(a.x, b.x);
				assert.floatEqual(a.y, b.y);
				assert.floatEqual(3, b.z);
			});
			
			it('vec3', function() {
				var a = new linal.Vec3(1, 2, 3);
				var b = new linal.Vec3(a);
				assert.floatEqual(a.x, b.x);
				assert.floatEqual(a.y, b.y);
				assert.floatEqual(a.z, b.z);
			});
			
			it('x, y, z', function() {
				var a = new linal.Vec3(1, 2, 3);
				assert.floatEqual(1, a.x);
				assert.floatEqual(2, a.y);
				assert.floatEqual(3, a.z);
			});
		});
		
		describe('add', function() {
			it('scalar', function() {
				var a = new linal.Vec3(1, 2, 3);
				var b = new linal.Vec3(a).add(2);
				assert.floatEqual(a.x + 2, b.x);
				assert.floatEqual(a.y + 2, b.y);
				assert.floatEqual(a.z + 2, b.z);
			});
			
			it('vec3', function() {
				var a = new linal.Vec3(1, 2, 3);
				var b = new linal.Vec3(3, 4, 5);
				var c = new linal.Vec3(a).add(b);
				assert.floatEqual(a.x + b.x, c.x);
				assert.floatEqual(a.y + b.y, c.y);
				assert.floatEqual(a.z + b.z, c.z);
			});
		});
		
		describe('angle', function() {
			it('vec3', function() {
				var a = new linal.Vec3(1, 2, 3);
				var b = new linal.Vec3(3, 4, 5);
				assert.equal(Math.acos(a.dot(b) / (a.length * b.length)), a.angle(b));
			});
		});
		
		describe('assign', function() {
			it('scalar', function() {
				var a = new linal.Vec3().assign(1);
				assert.floatEqual(1, a.x);
				assert.floatEqual(1, a.y);
				assert.floatEqual(1, a.z);
			});
			
			it('vec2', function() {
				var a = new linal.Vec2(1, 2);
				var b = new linal.Vec3().assign(a);
				assert.floatEqual(a.x, b.x);
				assert.floatEqual(a.y, b.y);
				assert.floatEqual(0, b.z);
			});
			
			it('vec2, z', function() {
				var a = new linal.Vec2(1, 2);
				var b = new linal.Vec3().assign(a, 3);
				assert.floatEqual(a.x, b.x);
				assert.floatEqual(a.y, b.y);
				assert.floatEqual(3, b.z);
			});
			
			it('vec3', function() {
				var a = new linal.Vec3(1, 2, 3);
				var b = new linal.Vec3().assign(a);
				assert.floatEqual(a.x, b.x);
				assert.floatEqual(a.y, b.y);
				assert.floatEqual(a.z, b.z);
			});
			
			it('x, y, z', function() {
				var a = new linal.Vec3().assign(1, 2, 3);
				assert.floatEqual(1, a.x);
				assert.floatEqual(2, a.y);
				assert.floatEqual(3, a.z);
			});
		});
		
		describe('cross', function() {
			it('vec3', function() {
				var a = new linal.Vec3(1, 2, 3);
				var b = new linal.Vec3(3, 4, 5);
				var cross = [
					(a.y * b.z) - (a.z * b.y),
					(a.z * b.x) - (a.x * b.z),
					(a.x * b.y) - (a.y * b.x)
				];
				assert.floatEqual(cross[0], a.cross(b).x);
				assert.floatEqual(cross[1], a.cross(b).y);
				assert.floatEqual(cross[2], a.cross(b).z);
			});
		});
		
		describe('distance', function() {
			it('vec3', function() {
				var a = new linal.Vec3(1, 1, 1)
				var b = new linal.Vec3(2, 2, 2);
				var distance = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2));
				assert.floatEqual(distance, a.distance(b));
			});
		});
		
		describe('divide', function() {
			it('scalar', function() {
				var a = new linal.Vec3(2, 4, 6);
				var b = new linal.Vec3(a).divide(2);
				assert.floatEqual(a.x / 2, b.x);
				assert.floatEqual(a.y / 2, b.y);
				assert.floatEqual(a.z / 2, b.z);
			});
			
			it('vec3', function() {
				var a = new linal.Vec3(2, 4, 6);
				var b = new linal.Vec3(4, 8, 16);
				var c = new linal.Vec3(a).divide(b);
				assert.floatEqual(a.x / b.x, c.x);
				assert.floatEqual(a.y / b.y, c.y);
				assert.floatEqual(a.z / b.z, c.z);
			});
			
			it('mat33', function() {
				var a = new linal.Vec3(1, 2, 3);
				var b = new linal.Mat33(9);
				var divided = [
					(a.x / b.array[0]) + (a.y / b.array[3]) + (a.z / b.array[6]),
					(a.x / b.array[1]) + (a.y / b.array[4]) + (a.z / b.array[7]),
					(a.x / b.array[2]) + (a.y / b.array[5]) + (a.z / b.array[8])
				];
				a.divide(b);
				assert.floatEqual(divided[0], a.x);
				assert.floatEqual(divided[1], a.y);
				assert.floatEqual(divided[2], a.z);
			});
			
			it('mat44', function() {
				var a = new linal.Vec3(1, 2, 3);
				var b = new linal.Mat44(16);
				var divided = [
					(a.x / b.array[0]) + (a.y / b.array[4]) + (a.z / b.array[ 8]) + b.array[12],
					(a.x / b.array[1]) + (a.y / b.array[5]) + (a.z / b.array[ 9]) + b.array[13],
					(a.x / b.array[2]) + (a.y / b.array[6]) + (a.z / b.array[10]) + b.array[14]
				];
				a.divide(b);
				assert.floatEqual(divided[0], a.x);
				assert.floatEqual(divided[1], a.y);
				assert.floatEqual(divided[2], a.z);
			});
		});
		
		describe('dot', function() {
			it('vec3', function() {
				var a = new linal.Vec3(2, 2, 2);
				var b = new linal.Vec3(4, 4, 4);
				var dot = (a.x * b.x) + (a.y * b.y) + (a.z * b.z);
				assert.floatEqual(dot, a.dot(b));
			});
		});
		
		describe('maximize', function() {
			it('vec3', function() {
				var a = new linal.Vec3(1, 2, 3);
				a.maximize(new linal.Vec3(3, 2, 1));
				assert.floatEqual(3, a.x);
				assert.floatEqual(2, a.y);
				assert.floatEqual(3, a.z);
			});
		});
		
		describe('minimize', function() {
			it('vec3', function() {
				var a = new linal.Vec3(1, 2, 3);
				a.minimize(new linal.Vec3(3, 2, 1));
				assert.floatEqual(1, a.x);
				assert.floatEqual(2, a.y);
				assert.floatEqual(1, a.z);
			});
		});
		
		describe('multiply', function() {
			it('scalar', function() {
				var a = new linal.Vec3(2, 4, 6);
				var b = new linal.Vec3(a).multiply(2);
				assert.floatEqual(a.x * 2, b.x);
				assert.floatEqual(a.y * 2, b.y);
				assert.floatEqual(a.z * 2, b.z);
			});
			
			it('vec3', function() {
				var a = new linal.Vec3(2, 4, 6);
				var b = new linal.Vec3(4, 8, 16);
				var c = new linal.Vec3(a).multiply(b);
				assert.floatEqual(a.x * b.x, c.x);
				assert.floatEqual(a.y * b.y, c.y);
				assert.floatEqual(a.z * b.z, c.z);
			});
			
			it('mat33', function() {
				var a = new linal.Vec3(1, 2, 3);
				var b = new linal.Mat33(9);
				var multiplied = [
					(a.x * b.array[0]) + (a.y * b.array[3]) + (a.z * b.array[6]),
					(a.x * b.array[1]) + (a.y * b.array[4]) + (a.z * b.array[7]),
					(a.x * b.array[2]) + (a.y * b.array[5]) + (a.z * b.array[8])
				];
				a.multiply(b);
				assert.floatEqual(multiplied[0], a.x);
				assert.floatEqual(multiplied[1], a.y);
				assert.floatEqual(multiplied[2], a.z);
			});
			
			it('mat44', function() {
				var a = new linal.Vec3(1, 2, 3);
				var b = new linal.Mat44(16);
				var multiplied = [
					(a.x * b.array[0]) + (a.y * b.array[4]) + (a.z * b.array[ 8]) + b.array[12],
					(a.x * b.array[1]) + (a.y * b.array[5]) + (a.z * b.array[ 9]) + b.array[13],
					(a.x * b.array[2]) + (a.y * b.array[6]) + (a.z * b.array[10]) + b.array[14]
				];
				a.multiply(b);
				assert.floatEqual(multiplied[0], a.x);
				assert.floatEqual(multiplied[1], a.y);
				assert.floatEqual(multiplied[2], a.z);
			});
		});
		
		describe('normalize', function() {
			it('', function() {
				var a = new linal.Vec3(1, 2, 3).normalize();
				assert.floatEqual(1.0, a.length);
			});
		});
		
		describe('rotateX', function() {
			it('radians', function() {
				var a = new linal.Vec3(0.5, 1.0, 1.5);
				var rotated = a.copy.rotateX(Math.PI);
				assert.floatEqual(a.x, rotated.x);
				assert.floatEqual((a.y * Math.cos(Math.PI)) - (a.z * Math.sin(Math.PI)), rotated.y);
				assert.floatEqual((a.y * Math.sin(Math.PI)) + (a.z * Math.cos(Math.PI)), rotated.z);
			});
		});
		
		describe('rotateY', function() {
			it('radians', function() {
				var a = new linal.Vec3(0.5, 1.0, 1.5);
				var rotated = a.copy.rotateY(Math.PI);
				assert.floatEqual(a.y, rotated.y);
				assert.floatEqual((a.x * Math.cos(Math.PI)) - (a.x * Math.sin(Math.PI)), rotated.x);
				assert.floatEqual((a.z * Math.sin(Math.PI)) + (a.z * Math.cos(Math.PI)), rotated.z);
			});
		});
		
		describe('rotateZ', function() {
			it('radians', function() {
				var a = new linal.Vec3(0.5, 1.0, 1.5);
				var rotated = a.copy.rotateZ(Math.PI);
				assert.floatEqual(a.z, rotated.z);
				assert.floatEqual((a.x * Math.cos(Math.PI)) - (a.x * Math.sin(Math.PI)), rotated.x);
				assert.floatEqual((a.y * Math.sin(Math.PI)) + (a.y * Math.cos(Math.PI)), rotated.y);
			});
		});
		
		describe('subtract', function() {
			it('scalar', function() {
				var a = new linal.Vec3(1, 2, 3);
				var b = new linal.Vec3(a).subtract(2);
				assert.floatEqual(a.x - 2, b.x);
				assert.floatEqual(a.y - 2, b.y);
				assert.floatEqual(a.z - 2, b.z);
			});
			
			it('vec3', function() {
				var a = new linal.Vec3(1, 2, 3);
				var b = new linal.Vec3(3, 4, 5);
				var c = new linal.Vec3(a).subtract(b);
				assert.floatEqual(a.x - b.x, c.x);
				assert.floatEqual(a.y - b.y, c.y);
				assert.floatEqual(a.z - b.z, c.z);
			});
		});
		
		describe('swap', function() {
			it('vec3', function() {
				var a = new linal.Vec3(1, 2, 3), ac = a.copy, aa = a;
				var b = new linal.Vec3(3, 2, 1), bc = b.copy, bb = b;
				aa.swap(bb);
				assert.strictEqual(a, aa);
				assert.strictEqual(b, bb);
				assert.floatEqual(ac.x, b.x);
				assert.floatEqual(ac.y, b.y);
				assert.floatEqual(ac.z, b.z);
				assert.floatEqual(bc.x, a.x);
				assert.floatEqual(bc.y, a.y);
				assert.floatEqual(bc.z, a.z);
			});
		});
		
		describe('toString', function() {
			it('', function() {
				var a = new linal.Vec3(1, 2, 3);
				assert.equal('(1, 2, 3)', a.toString());
			});
		});
	});
	
	describe('properties', function() {
		it('array', function() {
			var a = new linal.Vec3(1, 2, 3);
			var array = new Float32Array([1, 2, 3]);
			assert.floatEqual(array[0], a.array[0]);
			assert.floatEqual(array[1], a.array[1]);
			assert.floatEqual(array[2], a.array[2]);
		});
		
		it('copy', function() {
			var a = new linal.Vec3(1, 2, 3);
			var copy = a.copy;
			assert.notStrictEqual(a, copy);
			assert.floatEqual(a.x, copy.x);
			assert.floatEqual(a.y, copy.y);
			assert.floatEqual(a.z, copy.z);
		});
		
		it('length', function() {
			var a = new linal.Vec3(1, 2, 3);
			var length = Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2) + Math.pow(a.z, 2));
			assert.floatEqual(length, a.length);
		});
		
		it('normalized', function() {
			var a = new linal.Vec3(1, 2, 3);
			var b = a.copy.normalize();
			var normalized = a.normalized;
			assert.floatEqual(b.x, normalized.x);
			assert.floatEqual(b.y, normalized.y);
			assert.floatEqual(b.z, normalized.z);
			assert.floatEqual(b.length, normalized.length);
		});
		
		it('x', function() {
			var a = new linal.Vec3(1, 2, 3);
			assert.floatEqual(1, a.x);
			assert.floatEqual(a.array[0], a.x);
		});
		
		it('xy', function() {
			var a = new linal.Vec3(1, 2, 3);
			var b = a.xy;
			assert.equal(true, b instanceof linal.Vec2);
			assert.floatEqual(a.x, b.x);
			assert.floatEqual(a.y, b.y);
		});
		
		it('xz', function() {
			var a = new linal.Vec3(1, 2, 3);
			var b = a.xz;
			assert.equal(true, b instanceof linal.Vec2);
			assert.floatEqual(a.x, b.x);
			assert.floatEqual(a.z, b.y);
		});
		
		it('y', function() {
			var a = new linal.Vec3(1, 2, 3);
			assert.floatEqual(2, a.y);
			assert.floatEqual(a.array[1], a.y);
		});
		
		it('yz', function() {
			var a = new linal.Vec3(1, 2, 3);
			var b = a.yz;
			assert.equal(true, b instanceof linal.Vec2);
			assert.floatEqual(a.y, b.x);
			assert.floatEqual(a.z, b.y);
		});
		
		it('z', function() {
			var a = new linal.Vec3(1, 2, 3);
			assert.floatEqual(3, a.z);
			assert.floatEqual(a.array[2], a.z);
		});
	});
});

describe('Vector4', function() {
	it('class in linal', function() {
		assert.equal('function', typeof linal.Vec4);
		assert.equal(true, new linal.Vec4 instanceof linal.Vec4);
	});
	
	describe('methods', function() {
		describe('(constructor)', function() {
			it('(default)', function() {
				var a = new linal.Vec4();
				assert.floatEqual(a.x, 0);
				assert.floatEqual(a.y, 0);
				assert.floatEqual(a.z, 0);
				assert.floatEqual(a.w, 0);
			});
			
			it('scalar', function() {
				var a = new linal.Vec4(1);
				assert.floatEqual(1, a.x);
				assert.floatEqual(1, a.y);
				assert.floatEqual(1, a.z);
				assert.floatEqual(1, a.w);
			});
			
			it('vec2', function() {
				var a = new linal.Vec2(1, 2);
				var b = new linal.Vec4(a);
				assert.floatEqual(a.x, b.x);
				assert.floatEqual(a.y, b.y);
				assert.floatEqual(0, b.z);
				assert.floatEqual(1, b.w);
			});
			
			it('vec2, z', function() {
				var a = new linal.Vec2(1, 2);
				var b = new linal.Vec4(a, 3);
				assert.floatEqual(a.x, b.x);
				assert.floatEqual(a.y, b.y);
				assert.floatEqual(3, b.z);
				assert.floatEqual(1, b.w);
			});
			
			it('vec2, z, w', function() {
				var a = new linal.Vec2(1, 2);
				var b = new linal.Vec4(a, 3, 4);
				assert.floatEqual(a.x, b.x);
				assert.floatEqual(a.y, b.y);
				assert.floatEqual(3, b.z);
				assert.floatEqual(4, b.w);
			});
			
			it('vec3', function() {
				var a = new linal.Vec3(1, 2, 3);
				var b = new linal.Vec4(a);
				assert.floatEqual(a.x, b.x);
				assert.floatEqual(a.y, b.y);
				assert.floatEqual(a.z, b.z);
				assert.floatEqual(1, b.w);
			});
			
			it('vec3, w', function() {
				var a = new linal.Vec3(1, 2, 3);
				var b = new linal.Vec4(a, 4);
				assert.floatEqual(a.x, b.x);
				assert.floatEqual(a.y, b.y);
				assert.floatEqual(a.z, b.z);
				assert.floatEqual(4, b.w);
			});
			
			it('vec4', function() {
				var a = new linal.Vec4(1, 2, 3, 4);
				var b = new linal.Vec4(a);
				assert.floatEqual(a.x, b.x);
				assert.floatEqual(a.y, b.y);
				assert.floatEqual(a.z, b.z);
				assert.floatEqual(a.w, b.w);
			});
			
			it('x, y, z, w', function() {
				var a = new linal.Vec4(1, 2, 3, 4);
				assert.floatEqual(1, a.x);
				assert.floatEqual(2, a.y);
				assert.floatEqual(3, a.z);
				assert.floatEqual(4, a.w);
			});
		});
		
		describe('add', function() {
			it('scalar', function() {
				var a = new linal.Vec4(1, 2, 3, 4);
				var b = new linal.Vec4(a).add(2);
				assert.floatEqual(a.x + 2, b.x);
				assert.floatEqual(a.y + 2, b.y);
				assert.floatEqual(a.z + 2, b.z);
				assert.floatEqual(a.w + 2, b.w);
			});
			
			it('vec4', function() {
				var a = new linal.Vec4(1, 2, 3, 4);
				var b = new linal.Vec4(4, 5, 6, 7);
				var c = new linal.Vec4(a).add(b);
				assert.floatEqual(a.x + b.x, c.x);
				assert.floatEqual(a.y + b.y, c.y);
				assert.floatEqual(a.z + b.z, c.z);
				assert.floatEqual(a.w + b.w, c.w);
			});
		});
		
		describe('assign', function() {
			it('scalar', function() {
				var a = new linal.Vec4().assign(1);
				assert.floatEqual(1, a.x);
				assert.floatEqual(1, a.y);
				assert.floatEqual(1, a.z);
				assert.floatEqual(1, a.w);
			});
			
			it('vec2', function() {
				var a = new linal.Vec2(1, 2);
				var b = new linal.Vec4().assign(a);
				assert.floatEqual(a.x, b.x);
				assert.floatEqual(a.y, b.y);
				assert.floatEqual(0, b.z);
				assert.floatEqual(1, b.w);
			});
			
			it('vec2, z', function() {
				var a = new linal.Vec2(1, 2);
				var b = new linal.Vec4().assign(a, 3);
				assert.floatEqual(a.x, b.x);
				assert.floatEqual(a.y, b.y);
				assert.floatEqual(3, b.z);
				assert.floatEqual(1, b.w);
			});
			
			it('vec2, z, w', function() {
				var a = new linal.Vec2(1, 2);
				var b = new linal.Vec4().assign(a, 3, 4);
				assert.floatEqual(a.x, b.x);
				assert.floatEqual(a.y, b.y);
				assert.floatEqual(3, b.z);
				assert.floatEqual(4, b.w);
			});
			
			it('vec3', function() {
				var a = new linal.Vec3(1, 2, 3);
				var b = new linal.Vec4().assign(a);
				assert.floatEqual(a.x, b.x);
				assert.floatEqual(a.y, b.y);
				assert.floatEqual(a.z, b.z);
				assert.floatEqual(1, b.w);
			});
			
			it('vec3, w', function() {
				var a = new linal.Vec3(1, 2, 3);
				var b = new linal.Vec4().assign(a, 4);
				assert.floatEqual(a.x, b.x);
				assert.floatEqual(a.y, b.y);
				assert.floatEqual(a.z, b.z);
				assert.floatEqual(4, b.w);
			});
			
			it('x, y, z, w', function() {
				var a = new linal.Vec4().assign(1, 2, 3, 4);
				assert.floatEqual(1, a.x);
				assert.floatEqual(2, a.y);
				assert.floatEqual(3, a.z);
				assert.floatEqual(4, a.w);
			});
		});
		
		describe('divide', function() {
			it('scalar', function() {
				var a = new linal.Vec4(2, 4, 6, 8);
				var b = new linal.Vec4(a).divide(2);
				assert.floatEqual(a.x / 2, b.x);
				assert.floatEqual(a.y / 2, b.y);
				assert.floatEqual(a.z / 2, b.z);
				assert.floatEqual(a.w / 2, b.w);
			});
			
			it('vec4', function() {
				var a = new linal.Vec4(2, 4, 6, 8);
				var b = new linal.Vec4(4, 8, 16, 32);
				var c = new linal.Vec4(a).divide(b);
				assert.floatEqual(a.x / b.x, c.x);
				assert.floatEqual(a.y / b.y, c.y);
				assert.floatEqual(a.z / b.z, c.z);
				assert.floatEqual(a.w / b.w, c.w);
			});
			
			it('mat44', function() {
				var a = new linal.Vec4(1, 2, 3, 4);
				var b = new linal.Mat44(16);
				var divided = [
					(a.x / b.array[0]) + (a.y / b.array[4]) + (a.z / b.array[ 8]) + (a.w / b.array[12]),
					(a.x / b.array[1]) + (a.y / b.array[5]) + (a.z / b.array[ 9]) + (a.w / b.array[13]),
					(a.x / b.array[2]) + (a.y / b.array[6]) + (a.z / b.array[10]) + (a.w / b.array[14]),
					(a.x / b.array[3]) + (a.y / b.array[7]) + (a.z / b.array[11]) + (a.w / b.array[15])
				];
				a.divide(b);
				assert.floatEqual(divided[0], a.x);
				assert.floatEqual(divided[1], a.y);
				assert.floatEqual(divided[2], a.z);
				assert.floatEqual(divided[3], a.w);
			});
		});
		
		describe('dot', function() {
			it('vec4', function() {
				var a = new linal.Vec4(2, 2, 2, 2);
				var b = new linal.Vec4(4, 4, 4, 4);
				var dot = (a.x * b.x) + (a.y * b.y) + (a.z * b.z) + (a.w * b.w);
				assert.floatEqual(dot, a.dot(b));
			});
		});
		
		describe('maximize', function() {
			it('vec4', function() {
				var a = new linal.Vec4(1, 2, 3, 4);
				a.maximize(new linal.Vec4(4, 3, 2, 1));
				assert.floatEqual(4, a.x);
				assert.floatEqual(3, a.y);
				assert.floatEqual(3, a.z);
				assert.floatEqual(4, a.w);
			});
		});
		
		describe('minimize', function() {
			it('vec4', function() {
				var a = new linal.Vec4(1, 2, 3, 4);
				a.minimize(new linal.Vec4(4, 3, 2, 1));
				assert.floatEqual(1, a.x);
				assert.floatEqual(2, a.y);
				assert.floatEqual(2, a.z);
				assert.floatEqual(1, a.w);
			});
		});
		
		describe('multiply', function() {
			it('scalar', function() {
				var a = new linal.Vec4(2, 4, 6, 8);
				var b = new linal.Vec4(a).multiply(2);
				assert.floatEqual(a.x * 2, b.x);
				assert.floatEqual(a.y * 2, b.y);
				assert.floatEqual(a.z * 2, b.z);
				assert.floatEqual(a.w * 2, b.w);
			});
			
			it('vec4', function() {
				var a = new linal.Vec4(2, 4, 6, 8);
				var b = new linal.Vec4(4, 8, 16, 32);
				var c = new linal.Vec4(a).multiply(b);
				assert.floatEqual(a.x * b.x, c.x);
				assert.floatEqual(a.y * b.y, c.y);
				assert.floatEqual(a.z * b.z, c.z);
				assert.floatEqual(a.w * b.w, c.w);
			});
			
			it('mat44', function() {
				var a = new linal.Vec4(1, 2, 3, 4);
				var b = new linal.Mat44(16);
				var multiplied = [
					(a.x * b.array[0]) + (a.y * b.array[4]) + (a.z * b.array[ 8]) + (a.w * b.array[12]),
					(a.x * b.array[1]) + (a.y * b.array[5]) + (a.z * b.array[ 9]) + (a.w * b.array[13]),
					(a.x * b.array[2]) + (a.y * b.array[6]) + (a.z * b.array[10]) + (a.w * b.array[14]),
					(a.x * b.array[3]) + (a.y * b.array[7]) + (a.z * b.array[11]) + (a.w * b.array[15])
				];
				a.multiply(b);
				assert.floatEqual(multiplied[0], a.x);
				assert.floatEqual(multiplied[1], a.y);
				assert.floatEqual(multiplied[2], a.z);
				assert.floatEqual(multiplied[3], a.w);
			});
		});
		
		describe('normalize', function() {
			it('', function() {
				var a = new linal.Vec4(1, 2, 3, 4).normalize();
				assert.floatEqual(1.0, a.length);
			});
		});
		
		describe('subtract', function() {
			it('scalar', function() {
				var a = new linal.Vec4(1, 2, 3, 4);
				var b = new linal.Vec4(a).subtract(2);
				assert.floatEqual(a.x - 2, b.x);
				assert.floatEqual(a.y - 2, b.y);
				assert.floatEqual(a.z - 2, b.z);
				assert.floatEqual(a.w - 2, b.w);
			});
			
			it('vec4', function() {
				var a = new linal.Vec4(1, 2, 3, 4);
				var b = new linal.Vec4(4, 5, 6, 7);
				var c = new linal.Vec4(a).subtract(b);
				assert.floatEqual(a.x - b.x, c.x);
				assert.floatEqual(a.y - b.y, c.y);
				assert.floatEqual(a.z - b.z, c.z);
				assert.floatEqual(a.w - b.w, c.w);
			});
		});
		
		describe('swap', function() {
			it('vec3', function() {
				var a = new linal.Vec4(1, 2, 3, 4), ac = a.copy, aa = a;
				var b = new linal.Vec4(4, 3, 2, 1), bc = b.copy, bb = b;
				aa.swap(bb);
				assert.strictEqual(a, aa);
				assert.strictEqual(b, bb);
				assert.floatEqual(ac.x, b.x);
				assert.floatEqual(ac.y, b.y);
				assert.floatEqual(ac.z, b.z);
				assert.floatEqual(ac.w, b.w);
				assert.floatEqual(bc.x, a.x);
				assert.floatEqual(bc.y, a.y);
				assert.floatEqual(bc.z, a.z);
				assert.floatEqual(bc.w, a.w);
			});
		});
		
		describe('toString', function() {
			it('', function() {
				var a = new linal.Vec4(1, 2, 3, 4);
				assert.equal('(1, 2, 3, 4)', a.toString());
			});
		});
	});
	
	describe('properties', function() {
		it('array', function() {
			var a = new linal.Vec4(1, 2, 3, 4);
			var array = new Float32Array([1, 2, 3, 4]);
			assert.floatEqual(array[0], a.array[0]);
			assert.floatEqual(array[1], a.array[1]);
			assert.floatEqual(array[2], a.array[2]);
			assert.floatEqual(array[3], a.array[3]);
		});
		
		it('copy', function() {
			var a = new linal.Vec4(1, 2, 3, 4);
			var copy = a.copy;
			assert.notStrictEqual(a, copy);
			assert.floatEqual(a.x, copy.x);
			assert.floatEqual(a.y, copy.y);
			assert.floatEqual(a.z, copy.z);
			assert.floatEqual(a.w, copy.w);
		});
		
		it('length', function() {
			var a = new linal.Vec4(1, 2, 3, 4);
			var length = Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2) + Math.pow(a.z, 2) + Math.pow(a.w, 2));
			assert.floatEqual(length, a.length);
		});
		
		it('normalized', function() {
			var a = new linal.Vec4(1, 2, 3, 4);
			var b = a.copy.normalize();
			var normalized = a.normalized;
			assert.floatEqual(b.x, normalized.x);
			assert.floatEqual(b.y, normalized.y);
			assert.floatEqual(b.z, normalized.z);
			assert.floatEqual(b.w, normalized.w);
			assert.floatEqual(b.length, normalized.length);
		});
		
		it('x', function() {
			var a = new linal.Vec4(1, 2, 3, 4);
			assert.floatEqual(1, a.x);
			assert.floatEqual(a.array[0], a.x);
		});
		
		it('xy', function() {
			var a = new linal.Vec4(1, 2, 3, 4);
			var b = a.xy;
			assert.equal(true, b instanceof linal.Vec2);
			assert.floatEqual(a.x, b.x);
			assert.floatEqual(a.y, b.y);
		});
		
		it('xyz', function() {
			var a = new linal.Vec4(1, 2, 3, 4);
			var b = a.xyz;
			assert.equal(true, b instanceof linal.Vec3);
			assert.floatEqual(a.x, b.x);
			assert.floatEqual(a.y, b.y);
			assert.floatEqual(a.z, b.z);
		});
		
		it('xyw', function() {
			var a = new linal.Vec4(1, 2, 3, 4);
			var b = a.xyw;
			assert.equal(true, b instanceof linal.Vec3);
			assert.floatEqual(a.x, b.x);
			assert.floatEqual(a.y, b.y);
			assert.floatEqual(a.w, b.z);
		});
		
		it('xz', function() {
			var a = new linal.Vec4(1, 2, 3, 4);
			var b = a.xz;
			assert.equal(true, b instanceof linal.Vec2);
			assert.floatEqual(a.x, b.x);
			assert.floatEqual(a.z, b.y);
		});
		
		it('xzw', function() {
			var a = new linal.Vec4(1, 2, 3, 4);
			var b = a.xzw;
			assert.equal(true, b instanceof linal.Vec3);
			assert.floatEqual(a.x, b.x);
			assert.floatEqual(a.z, b.y);
			assert.floatEqual(a.w, b.z);
		});
		
		it('xw', function() {
			var a = new linal.Vec4(1, 2, 3, 4);
			var b = a.xw;
			assert.equal(true, b instanceof linal.Vec2);
			assert.floatEqual(a.x, b.x);
			assert.floatEqual(a.w, b.y);
		});
		
		it('y', function() {
			var a = new linal.Vec4(1, 2, 3, 4);
			assert.floatEqual(2, a.y);
			assert.floatEqual(a.array[1], a.y);
		});
		
		it('yz', function() {
			var a = new linal.Vec4(1, 2, 3, 4);
			var b = a.yz;
			assert.equal(true, b instanceof linal.Vec2);
			assert.floatEqual(a.y, b.x);
			assert.floatEqual(a.z, b.y);
		});
		
		it('yzw', function() {
			var a = new linal.Vec4(1, 2, 3, 4);
			var b = a.yzw;
			assert.equal(true, b instanceof linal.Vec3);
			assert.floatEqual(a.y, b.x);
			assert.floatEqual(a.z, b.y);
			assert.floatEqual(a.w, b.z);
		});
		
		it('yw', function() {
			var a = new linal.Vec4(1, 2, 3, 4);
			var b = a.yw;
			assert.equal(true, b instanceof linal.Vec2);
			assert.floatEqual(a.y, b.x);
			assert.floatEqual(a.w, b.y);
		});
		
		it('z', function() {
			var a = new linal.Vec4(1, 2, 3, 4);
			assert.floatEqual(3, a.z);
			assert.floatEqual(a.array[2], a.z);
		});
		
		it('zw', function() {
			var a = new linal.Vec4(1, 2, 3, 4);
			var b = a.zw;
			assert.equal(true, b instanceof linal.Vec2);
			assert.floatEqual(a.z, b.x);
			assert.floatEqual(a.w, b.y);
		});
		
		it('w', function() {
			var a = new linal.Vec4(1, 2, 3, 4);
			assert.floatEqual(4, a.w);
			assert.floatEqual(a.array[3], a.w);
		});
	});
});
