export class MemberRole {
	constructor(public code: string, public name: string) {}
}

export default class Member {
	constructor(public id: number, public email: string, public role: MemberRole) {}
}
