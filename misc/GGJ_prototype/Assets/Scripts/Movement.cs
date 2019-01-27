using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Movement : MonoBehaviour {
	public float SPEED = 5f;
	public float JUMP_FORCE = 5f;

	private Rigidbody2D rb;
	private Animator anim;

	public String movementAxisName = "Horizontal";
	public String jumpAxisName = "Vertical";
	public float movementInputValue = 0f;
	public float jumpInputValue = 0f;

	public bool isGrounded = false;
	// Use this for initialization
	void Start () {
		rb = GetComponent<Rigidbody2D>();
		anim = GetComponent<Animator>();
	}

	void Update () {
		movementInputValue = Input.GetAxis(movementAxisName);
		jumpInputValue = Input.GetAxis(jumpAxisName);

		if (movementInputValue != 0){
			anim.SetBool("isMoving", true);
		} else {
			anim.SetBool("isMoving", false);
		}

		Move();
		Jump();

	}

	void Move(){
		float movement =  movementInputValue * SPEED * Time.deltaTime;
		//print (movement);
		rb.velocity = new Vector2(movement, rb.velocity.y);
	}

	void Jump(){
		if (jumpInputValue != 0 && isGrounded){
			float jump = JUMP_FORCE * Time.deltaTime;
			Debug.Log(jump);
			rb.velocity = new Vector2(rb.velocity.x, jump);
			isGrounded = false;
		}
	}

	void OnCollisionStay2D(Collision2D coll){
		//Debug.Log("Waddup");
		if (coll.transform.tag == "Floor")
			isGrounded = true;
	}
}
