
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../model/user');
const Candidate = require('../model/candidate');

const { jwtAuthmiddleware } = require('../jwt');


// Check Admin Role
const checkAdminRole = async (userID) => {
    try {
        const user = await User.findById(userID);

        if (!user) {
            return false;
        }

        return user.role === 'admin';

    } catch (err) {
        console.log(err);
        return false;
    }
};


// 1. GET ALL CANDIDATES
router.get('/candidate', async (req, res) => {
    try {
        const candidates = await Candidate.find();

        res.status(200).json({
            message: 'Candidates fetched successfully',
            candidates: candidates
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// 2. ADD NEW CANDIDATE (ADMIN ONLY)
router.post('/candidate', jwtAuthmiddleware, async (req, res) => {
    try {
        const isAdmin = await checkAdminRole(req.user.id);

        if (!isAdmin) {
            return res.status(403).json({
                message: 'Only admin can add candidates'
            });
        }

       const { name, party, age } = req.body;

          const newCandidate = new Candidate({
                name,
                party,
                age
          });

        const response = await newCandidate.save();

        res.status(201).json({
            message: 'Candidate created successfully',
            candidate: response
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});


// 3. VOTE FOR A CANDIDATE
router.post('/vote/:candidateID', jwtAuthmiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    try {
        const candidateID = req.params.candidateID;
        const userId = req.user.id;

        if (!mongoose.isValidObjectId(candidateID)) {
            return res.status(400).json({
                message: 'Invalid candidate ID'
            });
        }

        await session.withTransaction(async () => {

            // Find user inside transaction
            const user = await User.findById(userId).session(session);

            if (!user) {
                const error = new Error('User not found');
                error.status = 404;
                throw error;
            }

            if (user.role === 'admin') {
                const error = new Error('Admin is not allowed to vote');
                error.status = 403;
                throw error;
            }

            if (user.role !== 'voter') {
                const error = new Error('Only voters are allowed to vote');
                error.status = 403;
                throw error;
            }

            if (user.isVoted) {
                const error = new Error('You have already voted');
                error.status = 400;
                throw error;
            }

            // Mark user as voted only if they have not voted before
            const updatedUser = await User.findOneAndUpdate(
                {
                    _id: userId,
                    role: 'voter',
                    isVoted: false
                },
                {
                    $set: { isVoted: true }
                },
                {
                    new: true,
                    session
                }
            );

            if (!updatedUser) {
                const error = new Error('You have already voted');
                error.status = 400;
                throw error;
            }

            // Record vote and increase candidate vote count
            const updatedCandidate = await Candidate.findByIdAndUpdate(
                candidateID,
                {
                    $push: {
                        votes: {
                            user: userId
                        }
                    },
                    $inc: {
                        voteCount: 1
                    }
                },
                {
                    new: true,
                    session
                }
            );

            if (!updatedCandidate) {
                const error = new Error('Candidate not found');
                error.status = 404;
                throw error;
            }
        });

        return res.status(200).json({
            message: 'Vote recorded successfully'
        });

    } catch (err) {
        console.log(err);

        return res.status(err.status || 500).json({
            message: err.message || 'Internal server error'
        });

    } finally {
        await session.endSession();
    }
});
// 4. GET VOTE COUNT
router.get('/vote/count', jwtAuthmiddleware, async (req, res) => {
    try {
        const candidates = await Candidate.find()
            .sort({ voteCount: 'desc' });

        const voteRecord = candidates.map((data) => {
            return {
                name: data.name,
                party: data.party,
                count: data.voteCount
            };
        });

        res.status(200).json(voteRecord);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});


// 5. UPDATE CANDIDATE (ADMIN ONLY)
router.put('/:candidateID', jwtAuthmiddleware, async (req, res) => {
    try {
        const isAdmin = await checkAdminRole(req.user.id);

        if (!isAdmin) {
            return res.status(403).json({
                message: 'Only admin can update candidates'
            });
        }

        const candidateID = req.params.candidateID;

        if (!mongoose.isValidObjectId(candidateID)) {
    return res.status(400).json({
        message: 'Invalid candidate ID'
    });
}

       const { name, party, age } = req.body;

       const response = await Candidate.findByIdAndUpdate(
                candidateID,
             { name, party, age },
           {
           new: true,
           runValidators: true
         }
        );

        if (!response) {
            return res.status(404).json({
                message: 'Candidate not found'
            });
        }

        res.status(200).json({
            message: 'Candidate updated successfully',
            candidate: response
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});


// 6. DELETE CANDIDATE (ADMIN ONLY)
router.delete('/:candidateID', jwtAuthmiddleware, async (req, res) => {
    try {
        const isAdmin = await checkAdminRole(req.user.id);

        if (!isAdmin) {
            return res.status(403).json({
                message: 'Only admin can delete candidates'
            });
        }

        const candidateID = req.params.candidateID;
        
        if (!mongoose.isValidObjectId(candidateID)) {
    return res.status(400).json({
        message: 'Invalid candidate ID'
    });
}

        const response = await Candidate.findByIdAndDelete(candidateID);

        if (!response) {
            return res.status(404).json({
                message: 'Candidate not found'
            });
        }

        res.status(200).json({
            message: 'Candidate deleted successfully'
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});


module.exports = router;
