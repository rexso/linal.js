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
