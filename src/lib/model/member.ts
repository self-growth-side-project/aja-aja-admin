import { TimeUtil } from '../util/time.util';

export class MemberRole {
	constructor(public code: string, public name: string) {}
}

export default class Member {
	public id: number;
	public email: string;
	public createdAt: string;
	public role: MemberRole;

	constructor(id: number, email: string, createdAt: string, role: MemberRole) {
		this.id = id;
		this.email = email;
		this.createdAt = TimeUtil.toStringByDayjs(TimeUtil.toDayjsBy(createdAt)) as string;
		this.role = role;
	}
}
