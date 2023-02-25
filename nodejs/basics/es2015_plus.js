/*
    ES2015+
*/
// template string
const num3 = 1;
const num4 = 2;
const result2 = num3 + num4;
const string2 = `${num3} 더하기 ${num4}는 '${result2}'`;
console.log(string2);

// object literal
var sayNode = function() {
    console.log('Node');
};
var es = 'ES';

const newObject = {
    sayJS() {
        console.log('JS');
    },
    sayNode,
    [es + 6]: 'Fantastic',
}
newObject.sayNode();
newObject.sayJS();
console.log(newObject.ES6);

// arrow function
var relationship1 = {// old
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends: function() {
        var that = this; // relationship1을 가리키는 this를 that에 저장
        this.friends.forEach(function (friend) {
            console.log(that.name, friend);
        });
    },
};

var relationship2 = {// new
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends() {
        this.friends.forEach(friend => {
            console.log(this.name, friend); // 화살표 함수에서는 상위스코프의 this를 그대로 물려받음.
        });
    },
};

// destructuring assignment
const candyMachine = {
    status: {
        name: 'node',
        count: 5.
    },
    getCandy() {
        this.status.count--;
        return this.status.count;
    }
};
const { getCandy, status: { count }} = candyMachine; // this 사용에 주의

// destructuring assignment on array
const array = ['nodejs', {}, 10, true];
const [node, obj, , bool] = array;

// class -> but still based on prototype
class Human {
    constructor(type = 'human') {
        this.type = type;
    }

    static isHuman(human) {
        return human instanceof  Human;
    }
    breathe() {
        alert('h-a-a-a-m');
    }
}
class Zero extends Human {
    constructor(type, firstName, lastName) {
        super(type);
        this.firstName = firstName;
        this.lastName = lastName;
    }

    sayName() {
        super.breathe();
        alert(`${this.firstName} ${this.lastName}`);
    }
}
const newZero = new Zero('human', 'Zero', 'Cho');
console.log(Human.isHuman(newZero));

// promise
function findAndSaveUser(Users) {
    Users.findOne({})
        .then((user) => {
            user.name = 'zero';
            return user.save();
        })
        .then((user) => {
            return Users.findOne({ gender: 'm' });
        })
        .then((user) => {
            // ...
        })
        .catch(err => {
            console.error(err);
        })
}

// multiple promise execute
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
Promise.all([promise1, promise2])
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    }) // promise 중 하나라도 reject되면 catch로 넘어감

// async/await
async function findSaveUserAsync(Users) {
    try {
        let user = await Users.findOne({});
        user.name = 'zero';
        user = await user.save();
        user = await Users.findOne({ gender: 'm' });
    } catch (error) {
        console.error(error);
    }
}

// for + async/await
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
(async () => {
    for await (promise of [promise1, promise2])  {
        console.log(promise);
    }
}) ();

