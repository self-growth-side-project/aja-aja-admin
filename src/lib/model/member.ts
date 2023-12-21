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

export class WithdrawnMember {
	public id: number;

	public memberId: number;

	public email: string;

	public joinedAt: string;

	public createdAt: string;

	public role: MemberRole;

	constructor(
		id: number,
		memberId: number,
		email: string,
		joinedAt: string,
		createdAt: string,
		role: MemberRole
	) {
		this.id = id;
		this.memberId = memberId;
		this.email = email;
		this.joinedAt = TimeUtil.toStringByDayjs(TimeUtil.toDayjsBy(joinedAt)) as string;
		this.createdAt = TimeUtil.toStringByDayjs(TimeUtil.toDayjsBy(createdAt)) as string;
		this.role = role;
	}
}
