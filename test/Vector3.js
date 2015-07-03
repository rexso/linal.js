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
