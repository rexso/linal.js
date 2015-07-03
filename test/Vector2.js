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
